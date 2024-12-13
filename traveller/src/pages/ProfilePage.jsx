import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import useAuthData from '../hooks/useAuthData';
import Spinner from '../components/Spinner';
import UserEditModal from '../components/modals/EditProfile';
import UserInfo from '../components/user/UserInfo';
import ExpenseInfo from '../components/user/ExpenseInfo';
import BookingList from '../components/user/BookingList';
import DynamicBreadcrumbs from '../components/Breadcrumbs';


const ProfilePage = () => {
  const { loading, error, userData, PaymentAndBookingData} = useAuthData();
  const confirmedData = PaymentAndBookingData?.filter(data => data.payment?.status === 'Confirmed' && data.bookingStatus === 'Confirmed');
  const totalConfirmedExpenseINR = confirmedData?.reduce((total, data) => total + data.payment.amount, 0);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  

  return (
    <Layout title="Profile | Traveller.com">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {loading === 'userLoading' ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          userData && (
            <div>
              <UserInfo userData={userData} openEditModal={openEditModal} />
              <ExpenseInfo totalConfirmedExpenseINR={totalConfirmedExpenseINR} />
              <BookingList confirmedData={confirmedData} />
            </div>
          )
        )}
        <UserEditModal
          show={isEditModalOpen}
          onClose={closeEditModal}
          user={userData}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;
