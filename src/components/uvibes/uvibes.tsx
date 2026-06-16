import Link from "next/link";
import "../../styles/uvibes/uvibes.css";
import Button from "../button/Button";
export default function Uvibes() {
  return (
    <section className="uvibes-section">
      <Link href={"/uvibes"}>
        <Button title="Une solution éthique" type="button" />
      </Link>
    </section>
  );
}
