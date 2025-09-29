import Intro from "../component/intro/Intro";
import PageHeader from "../component/pageHeader/PageHeader";
import Category from "../component/categorySelector/Category";


const Home = () => {
  return (
    <section>
      <PageHeader
        upperTitle="DEN"
        title="GLADE"
        subTitle="SKORPE"
        backgroundImage="/images/headerImg.png"
      />
    <Intro 
    title="Velkommen til Den Glade Skorpe"
    text="Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som 'Parma Drama' og 'Rabbit Royale'. Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!"
    />
    <Category />
    </section>
  );
};

export default Home;
