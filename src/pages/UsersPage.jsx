import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { customColors } from "../theme";
import api from "../backend/api/api";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import AddUserModal from "../components/users/AddUserModal";
import UpdateUserModal from "../components/users/UpdateUserModal";
import UsersAuditLogs from "../components/users/UsersAuditLogs";
import UsersHeader from "../components/users/UsersHeader";
import UsersRoleCard from "../components/users/UsersRoleCard";
import UsersStats from "../components/users/UsersStats";
import UsersTable from "../components/users/UsersTable";

const PAGE_SIZE = 5;

const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isAddModalOpen, setAddModalOpen] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);

	const fetchUsers = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await api.get("/users");
			setUsers(res.data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	const paginatedUsers = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return users.slice(start, start + PAGE_SIZE);
	}, [page, users]);

	const handleAddOpenModal = () => {
		setAddModalOpen(true);
	};

	const handleUpdateOpenModal = (id) => {
		setSelectedUserId(id);
		setUpdateModalOpen(true);
	};

	const handleAddCloseModal = () => {
		setAddModalOpen(false);
	};

	const handleUpdateCloseModal = () => {
		setSelectedUserId(null);
		setUpdateModalOpen(false);
	};

	const handleDeleteUser = async (id) => {
		try {
			await api.delete(`/users/${id}`);
			setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Box
			sx={{
				backgroundColor: customColors.background,
				color: customColors["on-background"],
				minHeight: "100vh",
			}}>
			<TopNavBar searchVariant="dashboard" />
			<SideNavBar activeLabel="User Management" />
			<Box
				component="main"
				sx={{ pl: { xs: 0, md: 32 }, pt: 8, minHeight: "100vh" }}>
				<Box
					sx={{
						p: { xs: 3, lg: 5 },
						maxWidth: 1280,
						mx: "auto",
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}>
					<UsersHeader onAddNewUser={handleAddOpenModal} />
					<AddUserModal
						open={isAddModalOpen}
						handleClose={handleAddCloseModal}
						onSuccess={fetchUsers}
					/>
					<UsersStats users={users} isLoading={isLoading} />
					<UsersTable
						users={paginatedUsers}
						totalCount={users.length}
						page={page}
						pageSize={PAGE_SIZE}
						onPageChange={setPage}
						onUpdateUser={handleUpdateOpenModal}
						onDeleteUser={handleDeleteUser}
						isLoading={isLoading}
					/>
					<UpdateUserModal
						open={isUpdateModalOpen}
						handleClose={handleUpdateCloseModal}
						id={selectedUserId}
						onSuccess={fetchUsers}
					/>
					<Grid container spacing={3} sx={{ mt: 4 }}>
						<Grid item xs={12} lg={8}>
							<UsersAuditLogs users={users} isLoading={isLoading} />
						</Grid>
						<Grid item xs={12} lg={4}>
							<UsersRoleCard users={users} isLoading={isLoading} />
						</Grid>
					</Grid>
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Users" />
		</Box>
	);
};

export default UsersPage;
