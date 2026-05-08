export function WizardStepper({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}): JSX.Element {
  return (
    <div aria-label="Wizard progress" className="mb-6 flex gap-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-full ${index <= currentStep ? 'bg-sky-400' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );
}
