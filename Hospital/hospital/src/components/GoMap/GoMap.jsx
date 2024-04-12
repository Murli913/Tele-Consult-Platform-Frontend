import React from "react";

const GoMap = () => {
  return (
    <div className="mb-4">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5324269985213!2d77.57785867320891!3d12.93774571562339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158e750221f1%3A0xf18e3d80c3d298aa!2sThe%20Bangalore%20Hospital!5e0!3m2!1sen!2sin!4v1712930713822!5m2!1sen!2sin"
        width="100%" // Set width to 100% for responsiveness
        height="150"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoMap;