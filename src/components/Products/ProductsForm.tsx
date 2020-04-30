import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ILocationState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ILocation, ProductModificationStatus } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import { editProduct, clearSelectedProduct, setModificationState, addProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, ILocationFormState } from "../../common/types/Form.types";

const ProductForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const products: ILocationState | null = useSelector((state: IStateType) => state.locations);
  let location: ILocation | null = products.selectedLocation;
  const isCreate: boolean = (products.modificationState === ProductModificationStatus.Create);

  if (!location || isCreate) {
    location = { id: 0, name: "", description: "", latitude: 0, longitude: 0 };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: location.name },
    description: { error: "", value: location.description },
    latitude: { error: "", value: location.latitude },
    longitude: { error: "", value: location.longitude },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addProduct : editProduct;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ILocationFormState, saveFn: Function): void {
    if (location) {
      dispatch(saveFn({
        ...location,
        name: formState.name.value,
        description: formState.description.value,
        latitude: formState.latitude.value,
        longitude: formState.longitude.value,
      }));

      dispatch(addNotification("Product edited", `Product ${formState.name.value} edited by you`));
      dispatch(clearSelectedProduct());
      dispatch(setModificationState(ProductModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ProductModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.latitude.error || formState.description.error
      || formState.name.error || formState.longitude.error || !formState.name.value) as boolean;
  }

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">Location {(isCreate ? "create" : "edit")}</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextInput id="input_email"
                    value={formState.name.value}
                    field="name"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={20}
                    label="Name"
                    placeholder="Name" />
                </div>
              </div>
              <div className="form-group">
                <TextInput id="input_description"
                  field="description"
                  value={formState.description.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Description"
                  placeholder="Description" />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <NumberInput id="input_latitude"
                    value={formState.latitude.value}
                    field="latitude"
                    onChange={hasFormValueChanged}
                    min={-100}
                    label="Latitude" />
                </div>
                <div className="form-group col-md-6">
                  <NumberInput id="input_longitude"
                    value={formState.longitude.value}
                    field="longitude"
                    onChange={hasFormValueChanged}
                    min={-100}
                    label="Longitude" />
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Cancel</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductForm;
