import React, { Fragment, Dispatch, useState, useEffect } from "react";
import LocationList from "./ProductsList";
import ProductForm from "./ProductsForm";
import TopCard from "../../common/components/TopCard";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ILocationState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeProduct, clearSelectedProduct, setModificationState,
  changeSelectedProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, ILocation } from "../../store/models/product.interface";

const Locations: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const locations: ILocationState = useSelector((state: IStateType) => state.locations);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedProduct());
    dispatch(updateCurrentPath("products", "list"));
  }, [path.area, dispatch]);

  function onProductSelect(product: ILocation): void {
    dispatch(changeSelectedProduct(product));
    dispatch(setModificationState(ProductModificationStatus.None));
  }

  function onProductRemove() {
    if(locations.selectedLocation) {
      setPopup(true);
    }
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Locations</h1>
      <p className="mb-4"></p>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(ProductModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(ProductModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onProductRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <LocationList
                onSelect={onProductSelect}
              />
            </div>
          </div>
        </div>
        {((locations.modificationState === ProductModificationStatus.Create)
          || (locations.modificationState === ProductModificationStatus.Edit && locations.selectedLocation)) ?
          <ProductForm /> : null}
      </div>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Are you sure?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!locations.selectedLocation) {
                  return;
                }
                dispatch(addNotification("Product removed", `Product ${locations.selectedLocation.name} was removed`));
                dispatch(removeProduct(locations.selectedLocation.id));
                dispatch(clearSelectedProduct());
                setPopup(false);
              }}>Remove
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Locations;
