import React, { useEffect, useState } from "react";
import { LuListPlus, LuSparkles } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/cards/SummaryCard ";
import SessionsGridSkeleton from "../../components/Loader/SessionsGridSkeleton";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import CreateSessionFrom from "./CreateSessionFrom";
import Modal from "../../components/Modal";
import DeleteAlAlertContent from "../../components/DeleteAlAlertContent";
import { toast } from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      setSessionsLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ALL
      );

      setSessions(response.data || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setSessionsLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try{
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,

      });
      fetchAllSessions();

    }catch(error){
      console.error("Error deleting session data:", error)
    }
  }


  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="container mx-auto pt-4 pb-4 px-[15px] font-body">
        <div className="flex items-center justify-between px-4 md:px-0 pt-6 pb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#0E1116]">
              Your sessions
            </h2>
            <p className="text-sm text-[#5B6472] mt-1">
              Pick up where you left off, or start a new round.
            </p>
          </div>
        </div>

        {sessionsLoading ? (
          <SessionsGridSkeleton />
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white border border-[#0E1116]/[0.06] rounded-2xl py-16 px-6 mx-4 md:mx-0">
            <span className="w-11 h-11 rounded-lg bg-[#34D399]/10 flex items-center justify-center mb-4">
              <LuSparkles size={20} className="text-[#34D399]" />
            </span>
            <h3 className="font-display text-lg font-semibold text-[#0E1116] mb-1">
              No sessions yet
            </h3>
            <p className="text-sm text-[#5B6472] max-w-sm">
              Create your first interview session to get a set of
              role-specific questions tailored to you.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pb-6 px-4 md:px-0">
            {sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role}
                topicToFocus={data?.topicToFocus || ""}
                experience={data?.experience || "_"}
                questions={data?.questions?.length || "_"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).fromNow()
                    : ""
                }
                onSelect={() =>
                  navigate(`/interview-prep/${data._id}`)
                }
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data,
                  })
                }
              />
            ))}
          </div>
        )}

        <button
          className="h-12 flex items-center justify-center gap-3 bg-[#FF6B4A] text-sm font-semibold text-white px-7 py-2.5 rounded-full fixed bottom-10 md:bottom-20 right-10 md:right-20 hover:bg-[#ff8064] hover:shadow-2xl hover:shadow-[#FF6B4A]/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuListPlus className="text-2xl" />
          Add New
        </button>
      </div>

      <Modal
         isOpen ={openCreateModal}
         onClose={()=>{
          setOpenCreateModal(false);
         }}
      >
        <div>
          <CreateSessionFrom/>
        </div>
      </Modal>

      <Modal
          isOpen ={openDeleteAlert?.open}
          onClose={()=>{
            setOpenDeleteAlert({
              open : false,
              data:null
            });
             
          }}
          title="Delete Alert"
      >
        <div>
          <DeleteAlAlertContent
            content="Are you sure you want to delete this session? This action cannot be undone."
            onDelete={() => {
              deleteSession(openDeleteAlert.data);
            }}
            onCancel={() => {
              setOpenDeleteAlert({
                open: false,
                data: null,
              });
            }}
          />
        </div>

      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;