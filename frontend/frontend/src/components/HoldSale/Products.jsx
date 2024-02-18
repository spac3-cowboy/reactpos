import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { toast } from "react-toastify";

export default function ProductAdd({
  form,
  productList,
  productLoading,
  totalCalculator,
  subTotal,
}) {
  const handleSetInitial = (product, serial) => {
    const productArray = form.getFieldValue("saleInvoiceProduct");
    const findProduct = productList.find((pro) => pro.id === product);
    if (findProduct.productQuantity === 0) {
      toast.warning("Product is out of stock");
    }
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        return {
          ...product,
          productQuantity: findProduct.productQuantity ? 1 : 0,
          productSalePrice: findProduct.productSalePrice,
          productVat: findProduct.productVat ? findProduct.productVat : 0,
          unitMeasurement: findProduct?.unitMeasurement,
        };
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      saleInvoiceProduct: newArray,
    });
    totalCalculator(serial);
  };

  return (
    <>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          SL
        </div>

        <div className='col-span-3 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          Product
        </div>

        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          U.M.
        </div>

        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          Quantity
        </div>

        <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          Sale Price
        </div>

        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          Vat
        </div>

        <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs sm:text-sm'>
          Total
        </div>

        <div className='col-span-1 md:text-base xxs:text-xs sm:text-sm'>
          Delete
        </div>
      </div>

      <hr style={{ backgroundColor: "black", marginTop: "0.5rem" }} />

      <Form.List
        name='saleInvoiceProduct'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className='max-h-[300px] overflow-y-auto overflow-x-hidden mt-2'>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className='grid grid-cols-12 gap-3' key={key}>
                  <div className='col-span-1'>{index + 1}</div>
                  <div className='col-span-3'>
                    <Form.Item
                      {...restField}
                      name={[name, "productId"]}
                      rules={[
                        {
                          required: true,
                          message: "Product is required",
                        },
                      ]}
                    >
                      <Select
                        placeholder='Select Product'
                        showSearch
                        loading={productLoading}
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(product) => {
                          handleSetInitial(product, index);
                        }}
                      >
                        {productList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className='col-span-1'>
                    <Form.Item {...restField} name={[name, "unitMeasurement"]}>
                      <Input
                        disabled
                        style={{ width: "100%" }}
                        size={"small"}
                        placeholder='U.M.'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-span-1'>
                    <Form.Item
                      {...restField}
                      name={[name, "productQuantity"]}
                      rules={[
                        {
                          required: true,
                          message: "quantity is required",
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        size={"small"}
                        placeholder='Quantity'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-span-2'>
                    <Form.Item
                      {...restField}
                      name={[name, "productSalePrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Price is required",
                        },
                      ]}
                    >
                      <InputNumber
                        size='small'
                        style={{ width: "100%" }}
                        placeholder='50000'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-span-1'>
                    <div className='font-weight-bold md:text-base xxs:text-xs'>
                      {subTotal[index]?.subVat || 0}%
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='font-weight-bold md:text-base xxs:text-xs'>
                      {subTotal[index]?.subPrice?.toFixed(2) || 0}
                    </div>
                  </div>
                  <div className='col-span-1'>
                    <Form.Item>
                      <button
                        shape='circle'
                        className='flex justify-center items-center bg-red-600 text-white p-2 rounded-md'
                        onClick={() => {
                          remove(name);
                          totalCalculator(index);
                        }}
                      >
                        <DeleteOutlined className='' />
                      </button>
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
            <Form.Item style={{ marginTop: "20px" }}>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}
