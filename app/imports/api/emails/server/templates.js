/* eslint-disable import/prefer-default-export */
export const eventTemplate = ({
  title,
  // start,
  // end,
  // description,
  sender,
}) => `
    <h4>Vous avez été invité à un évènement</h4>
    <br/>
    <div>
        Votre évènement "${title}" a été programmé par ${sender}.
    </div>
    <br/>
    <div>
        Vous pouvez l'ajouter à votre agenda en ouvrant la pièce jointe.
    </div>
    <br/>
`;
