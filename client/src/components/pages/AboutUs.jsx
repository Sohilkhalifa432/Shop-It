import React from "react";
import Layout from "../layout/Layout";

const AboutUs = () => {
  return (
    <Layout title="About-Ecommerce">
      <section className="bg-gradient-to-br from-[#053f5c] via-[#429ebd] to-[#9fe7f5] min-h-[60vh] flex items-center justify-center py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          {/* Left: Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
              alt="About our Camera Store"
              className="rounded-2xl shadow-lg border-4 border-[#f7ad19] w-full max-w-md object-cover"
            />
          </div>
          {/* Right: Content */}
          <div className="md:w-1/2 text-white">
            <h1 className="text-4xl font-extrabold mb-4 text-[#f7ad19] drop-shadow">
              About <span className="text-white">LensCraft</span>
            </h1>
            <p className="mb-4 text-lg text-white/90">
              Welcome to{" "}
              <span className="font-bold text-[#f7ad19]">LensCraft</span>, your
              destination for the latest cameras, accessories, and expert
              advice. We’re passionate about capturing moments, empowering
              creators, and making photography accessible to everyone.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-[#f7ad19] rounded-full mr-2"></span>
                <span>
                  <span className="font-semibold text-[#f7ad19]">
                    Curated Selection:
                  </span>{" "}
                  Only the best cameras & gear, handpicked by photographers.
                </span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-[#f7ad19] rounded-full mr-2"></span>
                <span>
                  <span className="font-semibold text-[#f7ad19]">
                    Expert Guidance:
                  </span>{" "}
                  Honest advice, reviews, and how-tos for all skill levels.
                </span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-[#f7ad19] rounded-full mr-2"></span>
                <span>
                  <span className="font-semibold text-[#f7ad19]">
                    Fast Shipping:
                  </span>{" "}
                  Get your gear quickly, wherever you are.
                </span>
              </li>
            </ul>
            <p className="mb-6 text-white/80">
              Whether you’re a seasoned pro or just starting out, we’re here to
              help you capture your world-one shot at a time.
            </p>
            <div>
              <span className="inline-block bg-[#f7ad19] text-[#053f5c] font-bold px-6 py-2 rounded-lg shadow hover:bg-[#429ebd] hover:text-white transition">
                Explore Our Cameras
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Optionally add team, values, or timeline sections below */}
    </Layout>
  );
};

export default AboutUs;
