import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import styles from "../styles/pageStyles/employees.module.css";
import PageHeader from "../component/pageHeader/PageHeader";
import Footer from "../component/footer/Footer";

const Employees = () => {
  const { get, isLoading, error } = useFetch();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await get.employees();
        setEmployees(Array.isArray(empData) ? empData : empData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setEmployees([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageHeader
        upperTitle="DEN"
        title="GLADE"
        subTitle="SKORPE"
        backgroundImage="/images/headerImg.png"
      />
      <section className={styles.employeesSection}>
        <div className={styles.textContainer}>
          <h1>Personalet hos Den Glade Skorpe</h1>
          <p>
            Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der
            altid går den ekstra mil for at sikre, at kunderne får den bedste
            oplevelse. Teamet består af erfarne pizzabagere, der med passion
            tilbereder lækre pizzaer med friske råvarer.
          </p>
        </div>
        <div className={styles.employeesList}>
          {isLoading && <p>Henter personalet...</p>}
          {error && <p>Fejl: {error}</p>}
          {employees.length === 0 && !isLoading && <p>Ingen ansatte fundet.</p>}

          {employees.map((emp) => (
            <div key={emp._id || emp.id} className={styles.employeeCard}>
              <img src={emp.image} alt={emp.name} />
              <h3>{emp.name}</h3>
              <p>{emp.position}</p>
            </div>
          ))}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Employees;
