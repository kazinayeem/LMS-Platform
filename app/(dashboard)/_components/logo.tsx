import Image from "next/image";
import React from "react";

export default function Logo() {
  return <Image src={"/logo.png"} alt="Logo" width={130} height={130} />;
}
