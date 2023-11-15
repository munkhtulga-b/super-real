import MainHeader from "./_components/MainHeader";
import MainOptions from "./_components/MainOptions";
import MainVideoFrame from "./_components/MainVideoFrame";
import ButtonSecondary from "./_components/buttons/ButtonSecondary";

export default function Home() {
  return (
    <main className="tw-flex tw-flex-col">
      <MainHeader />
      <MainVideoFrame />
      <MainOptions message="質問があります？" />
      <section className="tw-mt-[41px] tw-px-4">
        <ButtonSecondary />
      </section>
    </main>
  );
}
