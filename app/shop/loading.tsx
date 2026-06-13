import Skeleton from "@/components/common/Skeleton";

export default function ShopLoading() {
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
                    <Skeleton type="title" width="120px" height="40px" />
                </div>
            </section>

            {/* Content Skeleton */}
            <div className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div className="row clearfix">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div
                                        key={i}
                                        className="col-lg-4 col-md-6 col-sm-12"
                                        style={{ marginBottom: "30px" }}
                                    >
                                        <Skeleton
                                            type="image"
                                            height="250px"
                                            style={{ marginBottom: "15px" }}
                                        />
                                        <Skeleton
                                            type="text"
                                            width="80%"
                                            height="20px"
                                            style={{ marginBottom: "8px" }}
                                        />
                                        <Skeleton type="text" width="40%" height="16px" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
                            <Skeleton
                                type="image"
                                height="300px"
                                style={{ marginBottom: "20px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
