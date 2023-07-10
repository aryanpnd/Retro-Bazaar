import { Carousel } from "react-carousel-minimal";

function MyCarousel() {
  // const data = [
  //   {
  //     image:
  //       "https://images.prismic.io/yse-paris-production/3b7b9970-69a1-4bef-a25f-52799df5d636_yse-ensemble-lingerie-soir-de-rencontre-noir+%2815%29.jpg?auto=compress,format?auto=compress,format&fit=max&w=1280&q=50",
  //     caption: "",
  //   },
  //   {
  //     image:
  //       "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/46407/large_thumb%403x.jpg",
  //     caption: "",
  //   },
  //   {
  //     image:
  //       "https://cdn2.stylecraze.com/wp-content/uploads/2017/02/Types-Of-Lingerie-How-To-Choose-Lingerie-For-Your-Body-Type.jpg",
  //     caption: "",
  //   },
  // ];

  const data = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: "",
    },
    {
      image:
        "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
      caption: "",
    },
    {
      image:
        "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
      caption: "",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <Carousel
            data={data}
            time={4000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MyCarousel;
