import { useRouter } from "next/navigation";
import styles from "./ProfessorList.module.css";
import ProfessorCard from "../ProfessorCard/ProfessorCard";

export default function ProfessorList({ props }) {
  const router = useRouter();

  function onButtonClick(prop) {
    router.push(`/professor?search=${encodeURIComponent(prop._id)}`);
  }

  return (
    <div className={styles.container}>
      {props.map((prop, i) => (
        <ProfessorCard key={i} prop={prop} onButtonClick={onButtonClick} />
      ))}
    </div>
  );
}
