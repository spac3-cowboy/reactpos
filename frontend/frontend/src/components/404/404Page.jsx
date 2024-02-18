import React from "react";

const Page404 = () => {
  return (
    <center className='center'>
      <section className='py-[40px] bg-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 '>
              <div className='col-sm-10 col-sm-offset-1  text-center'>
                <div className='bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[400px] bg-center'>
                  <h1 className='text-center text-[80px]'>404</h1>
                </div>

                <div className='-mt-[50px]'>
                  <h3 className='h2'>Look like you're lost !</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a
                    href='/admin/dashboard'
                    className='py-[10px] px-5 rounded bg-[#39ac31] my-5 inline-block'
                  >
                    Go to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </center>
  );
};

export default Page404;
