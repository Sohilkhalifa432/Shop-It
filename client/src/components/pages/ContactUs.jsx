import React from "react";
import Layout from "../layout/Layout";

const ContactUs = () => {
  return (
    <Layout title="Contact Us - LensCraft">
      <section className="bg-gradient-to-br from-[#053f5c] via-[#429ebd] to-[#9fe7f5] min-h-[60vh] flex items-center justify-center py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Camera Image */}
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
              alt="Contact LensCraft"
              className="rounded-2xl shadow-lg border-4 border-[#f7ad19] w-full max-w-xs object-cover"
            />
          </div>
          {/* Right: Contact Form & Info */}
          <div className="md:w-1/2 bg-white/90 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-extrabold text-[#053f5c] mb-2">
              Contact Us
            </h1>
            <p className="mb-6 text-[#429ebd]">
              Have a question about cameras, your order, or just want to say hi?
              Fill out the form below or reach us directly-our team is here to
              help you capture every moment!
            </p>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-[#053f5c] font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border-2 border-[#9fe7f5] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#053f5c] font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 border-2 border-[#f7ad19] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#053f5c] font-semibold">
                  Message
                </label>
                <textarea
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border-2 border-[#9fe7f5] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] outline-none"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#f7ad19] text-[#053f5c] font-bold text-lg hover:bg-[#429ebd] hover:text-white transition"
              >
                Send Message
              </button>
            </form>
            {/* Alternative contact options */}
            <div className="mt-6 border-t pt-4">
              <p className="text-[#053f5c] font-semibold mb-2">
                Other ways to reach us:
              </p>
              <ul className="space-y-1 text-[#429ebd]">
                <li>
                  <span className="font-semibold text-[#f7ad19]">Email:</span>{" "}
                  support@shopIt.com
                </li>
                <li>
                  <span className="font-semibold text-[#f7ad19]">Phone:</span>{" "}
                  +91-12345-67890 (Mon-Sat, 9am-7pm)
                </li>
                <li>
                  <span className="font-semibold text-[#f7ad19]">Address:</span>{" "}
                  123 Camera Street, bhuj, India
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
