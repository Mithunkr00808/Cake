import Skeleton from "@/components/common/Skeleton";

export default function PortfolioLoading() {
    return (
        <>
            {/* Page Title Skeleton */}
            <section
                className="page-title"
                style={{
                    backgroundImage: "url(/assets/images/main-slider/slide_2.jpg)",
                }}
            >
                <div className="auto-container">
                    <Skeleton type="title" width="150px" height="40px" />
                </div>
            </section>

            {/* Portfolio Grid Skeleton */}
            <section className="portfolio-section" style={{ padding: "80px 0" }}>
                <div className="auto-container">
                    <div className="row">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="col-lg-4 col-md-6 col-sm-12"
                                style={{ marginBottom: "30px" }}
                            >
                                <Skeleton type="image" height="300px" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
