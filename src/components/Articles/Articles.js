import React from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import "./Articles.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { useSelector } from "react-redux";

export default function Articles() {
  const articles = useSelector((state) => state.articles.filter(article => article.isPublish));

  return (
    <>
      <div className="container my-5 rtl">
        <div className="row">
          <Swiper
            loop={true}
            navigation={true}
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1000: {
                slidesPerView: 3,
              },
            }}
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id}>
                <ArticleBox {...article} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
