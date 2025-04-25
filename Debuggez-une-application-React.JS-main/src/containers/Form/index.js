import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // const validateForm = (data) => {
  //   const errors = {};

  //   if (!data.nom?.trim()) errors.nom = "Le nom est requis.";
  //   if (!data.prenom?.trim()) errors.prenom = "Le prénom est requis.";
  //   if (!data.email?.trim()) {
  //     errors.email = "L'email est requis.";
  //   } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     errors.email = "Format d'email invalide.";
  //   }
  //   if (!data.message?.trim()) errors.message = "Le message est requis.";
  //   if (!data.personnel_entreprise?.trim()) {
  //     errors.personnel_entreprise = "Veuillez sélectionner un statut.";
  //   }

  //   return errors;
  // };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      // ajout de formData pour récupérer les valeurs des champs
      // const formData = new FormData(evt.target);
      // const data = {
      //   nom: formData.get("nom"),
      //   prenom: formData.get("prenom"),
      //   personnel_entreprise: formData.get("personnel_entreprise"),
      //   email: formData.get("email"),
      //   message: formData.get("message"),
      // };

      // const errors = validateForm(data);
      // if (Object.keys(errors).length > 0) {
      //   setSending(false);
      //   onError(errors);
      //   return;
      // }

      // We try to call mockContactApi
      try {
        // on passe data en argument de l'appel à l'API (mais l'API n'en prend pas)
        await mockContactApi();
        setSending(false);
        // ajout du cas succès
        onSuccess(true);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="nom" />
          <Field placeholder="" label="Prénom" name="prenom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            name="personnel_entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" name="email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
