import { Card, Typography } from "antd";
import { CSVLink } from "react-csv";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import UploadMany from "../Card/UploadMany";

const ImportFromCSV = ({ urlPath, title }) => {
  return (
    <>
      <center>
        <Card
          extra={
            <>
              <div className="px-4 py-1 bg-black/80 text-white border rounded-md">
                <CSVLink
                  data={[
                    [
                      "name",
                      "sku",
                      "description",
                      "productSubCategoryId",
                      "productBrandId",
                      "productQuantity",
                      "productPurchasePrice",
                      "productSalePrice",
                      "unitType",
                    ],
                    [
                      "product m",
                      "as1dgq",
                      "new product",
                      "1",
                      "1",
                      "200",
                      "1.5",
                      "3.18",
                      "pc",
                    ],
                    [
                      "product t6t",
                      "as13rtq",
                      "new product",
                      "2",
                      "1",
                      "200",
                      "1.5",
                      "3.18",
                      "pc",
                    ],
                    [
                      "product y5t",
                      "as12qbgb",
                      "new product",
                      "1",
                      "1",
                      "200",
                      "1.5",
                      "3.18",
                      "pc",
                    ],
                  ]}
                  className="text-white text-xs  md:text-base  py-1 px-0 rounded mr-2 "
                  filename={"sample product"}
                >
                  Download Sample CSV
                </CSVLink>
              </div>
            </>
          }
          className={`h-full column-design `}
        >
          <div
            className="p-8 bg-white dark:bg-transparent shadow rounded-lg dashboard-card-bg "
            style={{ maxWidth: "720px" }}
          >
            <Typography.Title level={3} className="m-2 text-center">
              Import {title} From CSV
            </Typography.Title>
            <UploadMany
              urlPath={urlPath}
              loadAllThunk={loadProduct}
              query={{ status: "true", page: 1, count: 10 }}
            />
          </div>
        </Card>
      </center>
    </>
  );
};

export default ImportFromCSV;
