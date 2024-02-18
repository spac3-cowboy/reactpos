import { Col, Layout, Row } from "antd";

function Footer({ data }) {
  const { Footer: AntFooter } = Layout;
  const year = new Date().getFullYear();

  return (
    <AntFooter className='w-full max-w-[640px] mx-auto'>
      <Row>
        <Col
          xs={24}
          md={24}
          lg={12}
          className='flex items-center justify-center lg:justify-between'
        >
          {!data?.footer ? (
            <p>
              {year}{" "}
              <a
                href='https://innovainfosys.com'
                className='font-weight-bold'
                target='_blank'
                rel='noreferrer'
              >
                Innova Infosys
              </a>{" "}
              
            </p>
          ) : (
            data.footer
          )}
        </Col>
        <Col xs={24} md={24} lg={12}>
          <div className='flex justify-center'>
            <ul className='flex gap-[16px]'>
              <li className='nav-item'>
                <a
                  href='https://example.ac'
                  className='nav-link text-muted'
                  target='/'
                >
                  Innova
                </a>
              </li>
              <li className='nav-item'>
                <a href='/admin' className='nav-link text-muted' target='/'>
                  About Us
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='/admin'
                  className='nav-link text-muted'
                  target='_blank'
                >
                  
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='/admin'
                  className='nav-link pe-0 text-muted'
                  target='_blank'
                >
                  
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
