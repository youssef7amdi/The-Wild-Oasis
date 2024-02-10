import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";

import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookingsStatus, bookings } = useRecentBookings();
  const isLoading1 = recentBookingsStatus === "pending";
  const { stays, confirmedStays, recentStaysStatus, numDays } =
    useRecentStays();
  const isLoading2 = recentStaysStatus === "pending";
  const { cabins, isLoading: isLoading3 } = useCabins();

  const isLoading = isLoading1 || isLoading2 || isLoading3;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
