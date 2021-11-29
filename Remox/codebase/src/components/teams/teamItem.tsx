import { useState } from "react";
import { Coins } from "../../types/coins";
import Modal from "../modal";
import Profile from '../../components/teams/buttons/profile'
import EditMember from '../../components/teams/buttons/editMember'
import Avatar from "../avatar";
import Delete from './buttons/delete'
import { useDeleteMemberMutation } from "../../redux/api/teamMember";
import { Member } from "../../types/sdk";

const TeamItem = (props: Member & { teamName: string }) => {
    const [deleteMember] = useDeleteMemberMutation()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const onDelete = async () => {
        try {
            await deleteMember(props.id).unwrap()
        } catch (error) {
            throw error
        }
    }

    return <>
        <div className="pl-[2px]">
            <div className="hover:cursor-pointer flex items-center space-x-1" onClick={() => setModalVisible(true)}>
                <Avatar name={props.name} />
                <div>
                    {props.name}
                </div>
            </div>
        </div>
        <div className="pl-[2px] hidden lg:flex items-center">
            {props.teamName}
        </div>
        <div className="pl-[2px] flex items-center justify-start gap-2">
            <div>
                <img src={Coins[props.currency].coinUrl} width="20" height="20" alt="" />
            </div>
            <div>{props.amount}</div>
            <div>
                {Coins[props.currency].name}
            </div>
        </div>
        <div className="pl-[2px] self-center truncate">
            {props.address}
        </div>
        {modalVisible && <Modal onDisable={setModalVisible}>
            <Profile {...props} onDeleteModal={setDeleteModal} onCurrentModal={setModalVisible} onEditModal={setModalEditVisible} />
        </Modal>}
        {modalEditVisible && <Modal onDisable={setModalEditVisible}>
            <EditMember {...props} onCurrentModal={setModalVisible} />
        </Modal>}
        {deleteModal && <Modal onDisable={setDeleteModal}>
            <Delete name={props.name} onCurrentModal={setDeleteModal} onDelete={onDelete} />
        </Modal>}

    </>
}

export default TeamItem;