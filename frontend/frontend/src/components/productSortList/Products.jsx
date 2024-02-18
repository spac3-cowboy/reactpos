import { DeleteOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Row } from "antd";

export default function ProductAdd({ subTotal, totalCalculator }) {
  return (
    <>
      <div className="grid grid-cols-12 gap-2">
     
          <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs'>SL</div>
      
          <div className='col-span-4 font-weight-bold md:text-base xxs:text-xs'>
            Product
          </div>
 
          <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs'>
           Unit Price
          </div>
  
          <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs'>
            Quantity
          </div>
    
          <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs'>Total</div>
   
          <div className='col-span-1 md:text-base xxs:text-xs'>Delete</div>
     
      </div>

      <hr style={{ backgroundColor: "black", marginTop: "0.5rem" }} />

      <Form.List
        name='products'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className='max-h-[200px] grid w-full overflow-y-auto overflow-x-visible mt-2'>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className="grid grid-cols-12 gap-2" key={key}>
                  <div className="col-span-1">{index + 1}</div>
                  <div className="col-span-4">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Product is required",
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                  </div>
                  <div className="col-span-2">
                    <Form.Item
                      {...restField}
                      name={[name, "productPurchasePrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Price is required",
                        },
                      ]}
                    >
                      <InputNumber
                        size='small'
                        // className="w-full text-sm xxs:p-0 md:p-2"
                        placeholder='50000'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-span-2">
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
                        // className="w-full text-sm xxs:p-0 md:p-2"
                        onChange={() => totalCalculator(index)}
                        size={"small"}
                        placeholder='Quantity'
                      />
                    </Form.Item>
                  </div>
                  <div className="col-span-2">
                    <div className='font-weight-bold totalMargin'>
                      {subTotal[index] || 0}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Form.Item>
                      <button
                        shape='circle'
                        className='flex justify-center items-center bg-red-600 text-white p-2 rounded-md'
                        onClick={() => {
                          remove(name);
                        }}
                      >
                        <DeleteOutlined className='' />
                      </button>
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Form.List>
    </>
  );
}
