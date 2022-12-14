import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getInsurance, updateInsurance } from "../actions/insurance";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const UpdateInsurance = ({ updateInsurance, getInsurance, insurance }) => {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [bank, setBank] = React.useState("");

  let loaded = false;
  // console.log(insurance !== null && loaded);
  // if (insurance !== null && loaded) {
  //   const { title } = insurance;
  //   setTitle(title);
  //   console.log(title);
  //   loaded = true;
  // }
  const { id } = useParams();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      insuranceType: type,
      description,
      bank,
    };

    const res = await updateInsurance(id, formData);
    console.log(res);
    if (res) {
      if (res.status === 200) {
        history("/dashboard");
      }
    }
  };

  useEffect(() => {
    const fetchInsurance = async () => {
      const res = await getInsurance(id);
      if (res) {
        const { title, insuranceType, description, bank } = res;
        setTitle(title);
        setType(insuranceType);
        setDescription(description);
        setBank(bank);
      }
    };
    fetchInsurance();
  }, [getInsurance, id]);

  return (
    <>
      <DashboardHeader>Dashboard</DashboardHeader>
      <section>
        <div className="container p-5">
          <h1
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                padding: 0,
                margin: "0 15px 8px 0",
                textDecoration: "none",
              }}
              className="text-dark"
              to="/dashboard"
            >
              {"<"}
            </Link>
            Update Insurance
          </h1>
          <br />
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3 w-50">
              <Alert />
            </div>

            <div className="mb-3 w-50">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title of insurance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 w-50">
              <label className="form-label">Insurance type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option defaultValue={true}>Select insurance type</option>
                <option value={"car"}>Car Insurance</option>
                <option value={"life"}>Life Insurance</option>
                <option value={"health"}>Health Insurance</option>
                <option value={"term"}>Term Life</option>
                <option value={"credit"}>Credit Cards</option>
                <option value={"car-"}>Car Loans</option>
                <option value={"personal"}>Personal Loans</option>
                <option value={"bank"}>Bank Accounts</option>
                <option value={"home"}>Home Loans</option>
                <option value={"debt"}>Debt Restructing</option>
              </select>
            </div>
            <div className="mb-3 w-50">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              ></textarea>
            </div>

            <div className="mb-3 w-50">
              <label className="form-label">Bank</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter bank through which insurance is related"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              />
            </div>
            <div className="mb-3 w-50">
              <button className="btn btn-dark w-100">Update insurance</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

UpdateInsurance.propTypes = {
  getInsurance: PropTypes.func.isRequired,
  updateInsurance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  insurance: state.insurance.insurance,
});

export default connect(mapStateToProps, { getInsurance, updateInsurance })(
  UpdateInsurance
);
