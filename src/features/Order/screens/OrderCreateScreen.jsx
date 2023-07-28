import React from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
//! imp Utils
import { parseIntlNumber } from "../../../utils/parse";
//! imp Constants
import constants from "../../../constants";
//! imp Comps
import AlertDismissibleComponent from "../../../components/Alert/AlertDismissibleComponent";
import OrderFormComponent from "../components/OrderFormComponent";
//! imp Actions
import { emptyCart } from "../../Cart/CartSlice";
import { createOrder, clearNotification } from "../OrderSlice";
//! imp API
import API from "../../../API";

const OrderCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! rootState
  const auth = useSelector((state) => state.auth);
  const isAdminController = auth.user?.roles
    ?.map((role) => role.name)
    .includes("admin");

  const { order, newOrder, loading, success, message, error } = useSelector(
    (state) => state.order
  );

  const { cartItems } = useSelector((state) => state.cart);

  const total = cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  //! localState: alert
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertOpts, setAlertOpts] = React.useState({
    variant: "",
    title: "",
    message: "",
  });

  React.useEffect(() => {
    if (success && message) {
      setAlertOpts({
        variant: "success",
        title: "Thông báo",
        message: message,
      });
      handleShowAlert();
    }
    if (success === false && error) {
      setAlertOpts({
        variant: "danger",
        title: "Lỗi hệ thống",
        message: error,
      });
      handleShowAlert();
    }
    return () => {
      dispatch(clearNotification());
    };
  }, [success, message, error]);

  async function handleCreateSubmit(data, e, methods) {
    const orderData = {
      user: data.userId,
      items: cartItems,
      total,
      status: data.status,
      name: data.name,
      address: data.address,
      transactionNo: data.transactionNo,
      bankTranNo: data.bankTranNo,
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();

      //! empty Cart
      dispatch(emptyCart());
      navigate("/admin/orders", { replace: true });
    } catch (error) {
      console.log(
        "__Debugger__OrderCreateScreen\n__handleCreateSubmit__error: ",
        error,
        "\n"
      );
    }
  }

  function handleClickCancel() {
    if (isAdminController) {
      navigate("/admin/orders");
    } else {
      navigate("/");
    }
  }

  function handleShowAlert() {
    setShowAlert(true);
  }

  function handleHideAlert() {
    setShowAlert(false);
  }

  const initialValues = {
    userId: auth?.user?._id,
  };

  return (
    <div className="container">
      <AlertDismissibleComponent
        show={showAlert}
        handleHideAlert={handleHideAlert}
        variant={alertOpts.variant}
        title={alertOpts.title}
        message={alertOpts.message}
        alwaysShown={true}
      />

      <div className="row">
        <div className="col-md-5 col-lg-5 col-xl-4">
          <div className="p-3">
            <span className="fw-bold">Chi tiết đơn hàng</span>
            {cartItems?.map((item) => (
              <div
                key={item.product}
                className="d-flex justify-content-between mt-2"
              >
                <span>
                  {item.name} ({item.quantity} cái)
                </span>
                <span>{parseIntlNumber(item.quantity * item.price)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Tổng cộng</span>
              <span className="text-success">{parseIntlNumber(total)}</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-7 offset-md-1">
          <OrderFormComponent
            loading={loading}
            initialValues={initialValues}
            onSubmit={handleCreateSubmit}
            handleClickCancel={handleClickCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCreateScreen;
