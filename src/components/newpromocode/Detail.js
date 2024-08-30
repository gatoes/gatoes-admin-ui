import React, { Component, Suspense } from "react";
import moment from "moment";
import { getCouponsByIdUsingMicroservice } from "../../actions/newpromocodes";
//import PromoCodeSlide from './PromoCodeSlide';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponId: this.props.match.params.index,
      detail: null,
    };
  }

  componentDidMount() {
    getCouponsByIdUsingMicroservice({ couponId: this.state.couponId }).then(
      (response) => {
        this.setState({
          detail: response.data.responseData.data,
        });
      }
    );
  }

  render() {
    const { detail } = this.state;
    console.log(detail, "");
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Details</h4>
              </div>
            </div>
            {detail != null ? (
              <div className="row">
                <div className="col-sm-12">
                  <div className="result-listing">
                    <table>
                      <tbody>
                        <tr>
                          <td>Name : </td>
                          <td>{detail.title}</td>
                        </tr>
                        <tr>
                          <td>Duration Days : </td>
                          <td>
                            {detail.start_date == null
                              ? "All Days"
                              : moment
                                  .utc(detail.start_date)
                                  .local()
                                  .format("MMM Do YYYY") +
                                " - " +
                                moment
                                  .utc(detail.end_date)
                                  .local()
                                  .format("MMM Do YYYY")}
                          </td>
                        </tr>
                        <tr>
                          <td>Time : </td>
                          <td>
                            {detail.start_time == null
                              ? "24 hrs"
                              : detail.start_time + " - " + detail.end_time}
                          </td>
                        </tr>
                        <tr>
                          <td>Discount Type: </td>
                          <td>
                            {detail.discountTypeTitle
                              ? detail.discountTypeTitle
                              : null}
                          </td>
                        </tr>
                        {detail.discountType !== 5 ||
                          detail.discountType !== 6 ||
                          (detail.discountType !== 7 && (
                            <tr>
                              <td>Coupon Type: </td>
                              <td>
                                {detail.couponTypeTitle
                                  ? detail.couponTypeTitle
                                  : null}
                              </td>
                            </tr>
                          ))}

                        <tr>
                          <td>Merchant Percentage: </td>
                          <td>
                            {detail.merchantBearPercentage
                              ? detail.merchantBearPercentage
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>Admin Percentage: </td>
                          <td>
                            {detail.adminBearPercentage
                              ? detail.adminBearPercentage
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>Total Used: </td>
                          <td>
                            {detail.totalAppliedCount
                              ? detail.totalAppliedCount
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>Discount : </td>
                          <td>
                            {" "}
                            {detail.discount
                              ? detail.discountTypeTitle.includes("Fixed")
                                ? `₹${detail.discount}`
                                : `${detail.discount}%`
                              : 0}
                          </td>
                        </tr>
                        {detail.categories && detail.categories.length > 0 && (
                          <tr>
                            <td>Applicable Categories</td>
                            <td>
                              <table>
                                <tbody>
                                  {detail.categories.map((obj, index) => (
                                    <React.Fragment key={index}>
                                      {obj.name}
                                      {index < detail.categories.length - 1 &&
                                        ", "}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                        {detail.items && detail.items.length > 0 && (
                          <tr>
                            <td>Applicable Items</td>
                            <td>
                              {detail.items.map((obj, index) => (
                                <React.Fragment key={index}>
                                  {obj.itemName}
                                  {index < detail.items.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td>Max Discount : </td>
                          <td>
                            {detail.maxDiscount >= Number.MAX_SAFE_INTEGER
                              ? "No maximum discount"
                              : detail.maxDiscount
                              ? detail.maxDiscount
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>Minimum Subtotal : </td>
                          <td>
                            {detail.minOrderAmount ? detail.minOrderAmount : 0}
                          </td>
                        </tr>
                        <tr>
                          <td>Promocode with other : </td>
                          <td>{detail.promocode_with_other ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td>Uses per coupon : </td>
                          <td>
                            {detail.totalCoupons == -1
                              ? "Unlimited"
                              : detail.totalCoupons}
                          </td>
                        </tr>
                        <tr>
                          <td>Uses per user : </td>
                          <td>
                            {detail.validPerUser == -1
                              ? "Unlimited"
                              : detail.validPerUser}
                          </td>
                        </tr>
                        {/* <tr><td>Business Zone : </td><td>{(detail.businessZone && (detail.businessZone.length > 0)) ? detail.businessZone.toString() : ''}</td></tr> */}

                        {detail.restaurant && detail.restaurant.length > 0 ? (
                          detail.restaurant.map((obj, index) => (
                            <>
                              <tr>
                                <td>Restaurant : </td>
                                <td>{obj.shopName}</td>
                              </tr>
                              <tr>
                                <td>Restaurant Category : </td>
                                <td>
                                  {obj.categoryName
                                    ? obj.categoryName.toString()
                                    : "All Category"}
                                </td>
                              </tr>
                            </>
                          ))
                        ) : (
                          <tr>
                            {/* <td>Restaurants : </td><td>All Restaurants</td> */}
                          </tr>
                        )}
                        {detail.couponsAssignedShops &&
                        detail.couponsAssignedShops.length > 0 ? (
                          <>
                            <tr>
                              <td>Assigned Shops:</td>
                              <td>
                                {detail.couponsAssignedShops.map(
                                  (shop, index) => (
                                    <>
                                      {shop.shopName
                                        ? shop.shopName + "," + " "
                                        : "N.A"}
                                    </>
                                  )
                                )}
                              </td>
                            </tr>
                          </>
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
