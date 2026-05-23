"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

import { socket } from "@/lib/socket";

import Sidebar from "@/app/sidebar/page";
import Navbar from "@/app/navbar/page";

export default function AssignmentPage() {
  const params = useParams();
  const id = params.id as string;
  const paperRef = useRef(null);

  const [assignment, setAssignment] = useState<any>(null);
  const [message, setMessage] = useState("Preparing Assignment...");

  const fetchAssignment = useCallback(async () => {
    try {
      const res = await fetch(`/api/assignment/${id}`, { cache: "no-store" });
      const data = await res.json();
      console.log("Fetched:", data?.status);
      setAssignment(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchAssignment();
    socket.connect();

    socket.on("connect", () => console.log("Socket Connected"));

    socket.on("assignment-update", async (data) => {
      console.log("SOCKET:", data);
      if (data.assignmentId !== id) return;
      setMessage(data.message);
      await fetchAssignment();
    });

    return () => {
      socket.off("assignment-update");
      socket.disconnect();
    };
  }, [id, fetchAssignment]);

  useEffect(() => {
    if (assignment?.status === "completed") return;
    const interval = setInterval(() => fetchAssignment(), 3000);
    return () => clearInterval(interval);
  }, [assignment?.status, fetchAssignment]);


  if (!assignment || assignment.status !== "completed") {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="mt-6 text-lg text-white font-medium text-center">{message}</p>
      </div>
    );
  }


  const paper = assignment.generatedPaper;

  return (
    <div className="min-h-screen bg-[#ECEEF2] flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 min-w-0 p-4 lg:p-6 flex flex-col">
          <div
            className="flex-1 rounded-[32px] p-3 md:p-5 flex flex-col gap-3"
            style={{ background: "#5E5E5E" }}
          >
          
            <div
              className="w-full rounded-[32px] flex flex-col lg:flex-row lg:items-center gap-6 px-5 md:px-8 py-6 shrink-0"
              style={{
                background: "#181818CC",
                borderTop: "4px solid rgba(255,255,255,0.12)",
                minHeight: "164px",
              }}
            >
              <p className="text-white text-sm md:text-lg font-medium flex-1 leading-relaxed">
                Certainly! Here is your AI-generated assignment paper prepared successfully.
              </p>
            </div>

           
            <div
              ref={paperRef}
              className="w-full rounded-[32px] bg-white"
              style={{ borderTop: "4px solid rgba(0,0,0,0.06)" }}
            >
              <div className="w-full px-6 md:px-10 py-10 text-black font-serif">

            
                <p className="text-sm mb-6 underline underline-offset-2">
                  All questions are compulsory.
                </p>

              
                <div className="flex flex-col gap-2 mb-8 text-sm">
                  <div className="flex gap-2">
                    <span>Name:</span>
                    <span className="border-b border-black w-48 inline-block" />
                  </div>
                  <div className="flex gap-2">
                    <span>Roll Number:</span>
                    <span className="border-b border-black w-40 inline-block" />
                  </div>
                  <div className="flex gap-2">
                    <span>Section:</span>
                    <span className="border-b border-black w-32 inline-block" />
                  </div>
                </div>

             
                {paper?.sections?.map((section: any, sIdx: number) => (
                  <div key={sIdx} className="mb-10">
                    <h2 className="text-center text-lg font-bold mb-4 underline">
                      Section {String.fromCharCode(65 + sIdx)}
                    </h2>

                    {section.sectionTitle && (
                      <p className="font-semibold text-sm mb-2">{section.sectionTitle}</p>
                    )}

                    {section.instructions && (
                      <p className="italic text-sm text-gray-600 mb-4">{section.instructions}</p>
                    )}

                    <div className="flex flex-col gap-4">
                      {section.questions?.map((q: any, qIdx: number) => (
                        <div key={qIdx} className="text-sm">
                          <div className="flex justify-between gap-5">
                            <p className="leading-relaxed">
                              <span className="font-semibold">Q{qIdx + 1}.</span>{" "}
                              {q.question}{" "}
                              <span className="font-medium">[{q.difficulty}]</span>
                            </p>
                            <span className="whitespace-nowrap font-semibold">
                              {q.marks} Marks
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

             
                <p className="font-bold text-sm mt-8 mb-6">End of Question Paper</p>

             
                {paper?.answerKey && paper.answerKey.length > 0 && (
                  <div className="border-t border-black pt-6 mt-6">
                    <h3 className="font-bold text-base mb-4">Answer Key:</h3>
                    <ol className="flex flex-col gap-3 text-sm list-decimal list-outside pl-5">
                      {paper.answerKey.map((item: any, i: number) => (
                        <li key={i} className="leading-relaxed">
                          {item.answer}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}