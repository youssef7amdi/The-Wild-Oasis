import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { settingsStatus, updateSetting } = useUpdateSetting();

  function handleUpdate(e, prevValue, field) {
    const { value } = e.target;

    if (!value.trim() || Number(value.trim()) === Number(prevValue)) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={settingsStatus === "pending"}
          onBlur={(e) => handleUpdate(e, minBookingLength, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={settingsStatus === "pending"}
          onBlur={(e) => handleUpdate(e, maxBookingLength, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={settingsStatus === "pending"}
          onBlur={(e) =>
            handleUpdate(e, maxGuestsPerBooking, "maxGuestsPerBooking")
          }
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={settingsStatus === "pending"}
          onBlur={(e) => handleUpdate(e, breakfastPrice, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
