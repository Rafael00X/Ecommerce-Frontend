import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "../../store/index";
import { ReactComponent as StarIcon } from "../../assets/svg/star.svg";
import styles from "./AddReviewCard.module.css";

export default function AddReview(props) {
  const { productId } = props;
  const [values, setValues] = useState({
    rating: 0,
    text: "",
  });

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const submit = () => {
    if (!isLoggedIn) return dispatch(actions.loginModalActions.open());
    // TODO - Add Review
    alert("Review Added");
  };

  const stars = [];
  for (let i = 1; i <= 5; i++)
    stars.push(
      <StarIcon
        key={i}
        onClick={() => setValues({ ...values, rating: i })}
        className={
          `star zoom ${styles.star} ` +
          (values.rating >= i ? styles.active : styles.inactive)
        }
      />
    );

  return (
    <div className={styles.container}>
      <h3>Add a review</h3>
      <br />
      <div>{stars}</div>
      <textarea
        className={styles.text}
        onChange={(e) => setValues({ ...values, text: e.target.value })}
        placeholder="Tell us something about the product"
        value={values.text}
      ></textarea>
      <button className={"btn btn-dark " + styles.btn} onClick={submit}>
        Submit
      </button>
    </div>
  );
}
