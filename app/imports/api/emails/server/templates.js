/* eslint-disable import/prefer-default-export */
export const eventTemplate = ({
  title,
  start,
  // end,
  // description,
  sender,
}) => `
    <h4>VOus avez été invité à un évenement</h4>
    <br/>
    <div>
        Votre évenement "${title}" a été programmé par ${sender} le ${start}
    </div>
    <br/>
    <div>
        Vous pouvez l'ajouter à votre agenda en ouvrant la pièce jointe.
    </div>
    <br/>
`;
