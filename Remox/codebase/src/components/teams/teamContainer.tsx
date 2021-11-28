import { useState } from "react";
import { generate } from "shortid";
import { useDeleteTeamMutation, useUpdateTeamMutation } from "../../redux/api";
import { TeamInfoWithMembers } from "../../types/sdk";
import Modal from "../modal";
import Delete from "./buttons/delete";
import EditTeam from './buttons/editTeam'
import TeamItem from "./teamItem";


const TeamContainer = (props : TeamInfoWithMembers) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteTeam] = useDeleteTeamMutation()

    const [editModal, setEditModal] = useState(false)

    const [num, setNum] = useState(3)

    const DeleteTeam = async () => {
        try {
            await deleteTeam(props.id).unwrap()
            setDeleteModal(false)
        } catch (error) {
            throw error
        }
    }

    return <>
        <div className="col-span-4 flex space-x-3 py-4 pt-14 pb-1 px-5 items-center">
            <div className="font-semibold text-[1.5rem] overflow-hidden whitespace-nowrap ">
                <div>{props.title}</div>
            </div>
            <div className="cursor-pointer" onClick={() => setEditModal(true)}>
                <img src="/icons/editicon.svg" alt="" />
            </div>
            <div className="cursor-pointer" onClick={()=>setDeleteModal(true)}>
                <img src="/icons/trashicon.svg" alt="" />
            </div>
        </div>
        {props.teamMembers.slice(0, num).map(w =>
            <div key={generate()} className="grid grid-cols-[30%,30%,1fr] lg:grid-cols-[20%,20%,20%,1fr] py-6 border-b border-black pb-5 px-5 text-sm">
                <TeamItem teamName={props.title} {...w}/>
            </div>
        )}
        {props.teamMembers.length > 3 && num !== 100 ? <button className="py-3 pb-5 px-5 font-bold text-primary" onClick={() => setNum(100)}>
            Show More
        </button> : null}
        {!props.teamMembers.length ? <div className="b-5 px-5 border-b border-black pb-5">No Team Member Yet</div> : undefined}
        {deleteModal && <Modal onDisable={setDeleteModal}>
            <Delete name={props.title} onCurrentModal={setDeleteModal} onDelete={DeleteTeam} />
        </Modal>}
        {editModal && <Modal onDisable={setEditModal}>
            <EditTeam {...props} onCurrentModal={setEditModal} />
        </Modal>}
    </>
}

export default TeamContainer;