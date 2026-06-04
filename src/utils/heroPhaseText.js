export const getHeroPhaseText = ({ email, submitted }) => {
  if (submitted) {
    return 'Coming soon';
  }

  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    return 'Coming soon';
  }

  const atIndex = normalizedEmail.indexOf('@');

  if (atIndex === -1) {
    return 'Seize';
  }

  const domainText = normalizedEmail.slice(atIndex + 1);

  if (!domainText) {
    return 'Seize your';
  }

  return 'Seize your Aura';
};

export const getHeroPhraseStage = ({ email, submitted }) => {
  const phaseText = getHeroPhaseText({ email, submitted });

  if (phaseText === 'Seize') {
    return 'seize';
  }

  if (phaseText === 'Seize your') {
    return 'seize-your';
  }

  if (phaseText === 'Seize your Aura') {
    return 'seize-your-aura';
  }

  return 'coming-soon';
};
