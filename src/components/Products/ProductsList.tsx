import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ILocationState } from "../../store/models/root.interface";
import { ILocation } from "../../store/models/product.interface";

export type productListProps = {
  onSelect?: (product: ILocation) => void;
  children?: React.ReactNode;
};

function LocationList(props: productListProps): JSX.Element {
  const products: ILocationState = useSelector((state: IStateType) => state.locations);

  const productElements: (JSX.Element | null)[] = products.locations.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedLocation && products.selectedLocation.id === product.id) ? "selected" : ""}`}
      onClick={() => {
        if (props.onSelect) props.onSelect(product);
      }}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.latitude}</td>
      <td>{product.longitude}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default LocationList;
