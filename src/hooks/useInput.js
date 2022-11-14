// export default function useInput(validity) {
//   const [enteredValue, setEnteredValue] = useState("");
//   const [touched, setIstouched] = useState(false);

//   const enteredValueIsValid = validity(enteredValue);
//   const enteredValueInvalid = !enteredValueIsValid && touched;

//   const blurHandler = () => {
//     setIstouched(true);
//   };

//   const enteredValueHandler = (event) => {
//     setEnteredValue(event.target.value);
//   };

//   const submitHandler = () => {
//     setIstouched(true);

//     setEnteredValue("");
//     setIstouched(false);
//   };
//   return {
//     enteredValue,
//     enteredValueIsValid,
//     enteredValueInvalid,
//     enteredValueHandler,
//     touched,
//     blurHandler,
//     submitHandler,
//   };
// }
