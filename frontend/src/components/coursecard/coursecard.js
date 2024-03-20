import React, { useState } from "react";
import likeImg from "../../assets/images/like.svg";
import starImg from "../../assets/images/star.svg";
import clk from "../../assets/images/clock.png"
import open from"../../assets/images/collab.jpg"
import comp from "../../assets/images/completed.jpeg"

import coursedata from "./coursedata";
import "./coursecard.css";

const Coursecard = ({ course }) => {
  return (
    <div id="cardwhole">
      <div className="course-card">
        <div className="swiper-slide swiper-slide1">
          <div>
            {course.complete && (
              <img src={comp} alt="Image A" id="sp-profile" />
            )}
            {!course.complete && (
              <img src={clk} alt="Image A" id="sp-profile" />
            )}
            
          </div>

          
          {/* <img src={course.creatorimage} className="sp-profile" alt="" /> */}

          <div style={{ display: 'flex' }} className="profimg">
            {course.creatorimage.map((image, idx) => (
                <img id="sp-profile"
                    key={idx}
                src={image}
                alt={`Image ${idx}`}
                style={{
                    position: 'relative',
                    left: `${-1 * idx}px`, // Adjust the overlap amount here
                    zIndex: idx, // Increase z-index to make sure images overlap correctly
                    marginRight: '-10px' // Adjust the spacing between images here
                }}
         />
         
    ))}
    </div>

         
          <div className="projpic">
            <img src={course.courseimage} className="sw-img" alt="" />
          </div>

          <div></div>

          <div className="sw-details">
            <div className="sw-details-1">
              <h2>{course.title}</h2>
              {/* <p>{details.projecttitle}</p> */}
            </div>
            <div className="sw-details-2">
              <div id="tags1">
                {course.tags.slice(0, 3).map((tag, idx) => {
                  return (
                    <a
                      href="#"
                      id={tag.name}
                      className="tags1"
                      key={idx}
                      style={{ borderColor: tag.color, color: tag.color }}
                    >
                      {tag.name}
                    </a>
                  );
                })}
                {course.tags.length > 3 && <span> . . . </span>}
              </div>

              <div id="wait">
                <div>
                  <div>
                    <img src={likeImg} alt="" />
                  </div>{" "}
                  <span>{course.helpful}</span>
                </div>
                <div>
                  <div>
                    <img src={starImg} alt="" />
                  </div>{" "}
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursecard;
