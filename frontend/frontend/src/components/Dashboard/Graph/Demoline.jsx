import { Line } from "@ant-design/plots";
import { Card, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/rtk/features/dashboard/dashboardSlice";
import { loadAllPurchase } from "../../../redux/rtk/features/purchase/purchaseSlice";
import { loadAllSale } from "../../../redux/rtk/features/sale/saleSlice";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";

//Date fucntinalities
let startdate = moment(new Date()).startOf("month").format("YYYY-MM-DD");
let enddate = moment(new Date()).endOf("month").format("YYYY-MM-DD");

const DemoLine = () => {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.dashboard.list?.saleProfitCount);
	const cardInformation = useSelector(
		(state) => state.dashboard.list?.cardInfo
	);

	const { RangePicker } = DatePicker;

	useEffect(() => {
		dispatch(loadDashboardData({ startdate, enddate }));
		dispatch(
			loadAllPurchase({
				page: 1,
				count: 10,
				startdate: moment().startOf("month"),
				enddate: moment().endOf("month"),
			})
		);
		dispatch(
			loadAllSale({
				page: 1,
				count: 10,
				startdate: moment().startOf("month"),
				enddate: moment().endOf("month"),
				user: "",
			})
		);
	}, []);

	const onCalendarChange = (dates) => {
		startdate = (dates?.[0]).format("YYYY-MM-DD");
		enddate = (dates?.[1]).format("YYYY-MM-DD");
		dispatch(
			loadDashboardData({
				startdate: startdate,
				enddate: enddate,
			})
		);

		dispatch(
			loadAllPurchase({
				page: 1,
				count: 10,
				startdate: startdate,
				enddate: enddate,
			})
		);

		dispatch(
			loadAllSale({
				page: 1,
				count: 10,
				startdate: startdate,
				enddate: enddate,
				user: "",
			})
		);
	};

	const config = {
		data,
		xField: "date",
		yField: "amount",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: (v) => `${v / 1000} K`,
			},
		},
		legend: {
			position: "top",
		},
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 5000,
			},
		},
	};

	// return (
	// 	<Fragment>
	// 		<div className='mb-3 mt-3 w-full' style={{ maxWidth: "25rem" }}>
	// 			<RangePicker
	// 				onCalendarChange={onCalendarChange}
	// 				defaultValue={[
	// 					dayjs(startdate, "YYYY-MM-DD"),
	// 					dayjs(enddate, "YYYY-MM-DD"),
	// 				]}
	// 				className='range-picker'
	// 			/>
	// 		</div>

	// 		<NewDashboardCard information={cardInformation} />
	// 	</Fragment>
	// );
};

export default DemoLine;
