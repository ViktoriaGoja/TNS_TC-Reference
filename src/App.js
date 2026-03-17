import { useState, useRef, useEffect } from "react";

const SECTIONS = [
  {t:"Enrollment",s:"both",b:["By enrolling in The Next Street's driver training program and signing this document, I acknowledge that I am permitted to participate in the driver training program administered by The Next Street. I understand that the course will be conducted by state-licensed instructors from The Next Street."]},
  {t:"Assumption of Risk and Waiver of Liability",s:"both",b:["Driving and driver training involve inherent risks, including but not limited to property damage, personal injury, or death. By enrolling in The Next Street's program, the student and, where applicable, the student's parent or guardian expressly acknowledge and accept these risks.","To the fullest extent permitted by applicable law, The Next Street, its employees, instructors, and affiliates shall not be liable for any injury, loss, or damage arising from participation in the driver training program, except where caused by the gross negligence or willful misconduct of The Next Street. This waiver does not affect any rights or remedies available under Connecticut or Massachusetts law."]},
  {t:"Requirements and State Compliance",s:"both",b:["The Next Street operates in accordance with all driver education laws as prescribed by the Connecticut Department of Motor Vehicles and the Massachusetts Registry of Motor Vehicles.","It is the student's responsibility to:","• Confirm compliance with state-specific eligibility requirements","• Understand and adhere to age, scheduling, and instructional hour regulations"]},
  {t:"Safety and Instructor Discretion",s:"both",b:["The Next Street maintains a zero-compromise approach to safety. Accordingly, instructors are granted sole discretion to:","• Terminate a lesson or license test early or refuse service if the student demonstrates unsafe behavior, impaired judgment, or fails to meet preparedness requirements.","• Modify lesson progression based on skill, attitude, performance, or perceived safety risks.","• Cancel or reschedule lessons due to inclement weather or hazardous road conditions.","Students are required to:","• Comply with all safety directives issued by instructors.","• Wear footwear compliant with the Footwear Policy.","• Refrain from engaging in disruptive, inappropriate, or unlawful behavior."]},
  {t:"Disciplinary Code of Conduct",s:"both",b:["Students must comply with all Company conduct requirements during in-person and online instruction, driving lessons, and license test appointments.","ZERO-TOLERANCE VIOLATIONS:","• Abusive, harassing, or discriminatory language or behavior","• Possession, use, or influence of alcohol, cannabis, or illegal substances during any appointment","• Refusal to follow instructor directions that compromise safety","PROGRESSIVE DISCIPLINE:","• First non-severe violation: Verbal or written warning at the Company's discretion","• Second violation, any serious offense, or excessive absenteeism: Immediate termination without refund","• The Next Street may escalate or bypass this process for severe, repeated, or attendance-related misconduct."]},
  {t:"Connecticut Age Restriction Guidelines",s:"ct",b:["• Students must be at least 16 years old to receive credit for any classroom sessions or driving lessons.","• While school is in session, students under 18 may attend a maximum of 2 hours of classroom instruction on weekdays, 4 hours on weekend days, and 2 hours of driving lessons per day.","• During school breaks, students under 18 may attend up to 4 hours of classroom instruction and 2 hours of driving lessons per day.","• Students aged 18 and older may participate in up to 8 hours of classroom sessions and 2 hours of driving lessons per day, unless enrolled in secondary school (max 4 hours classroom on weekdays).","• Students may enroll in a classroom course at age 15, provided the class starts after their 16th birthday. No credit will be given for classes taken while the student is under 16.","• Those enrolling in the Permit Prep Tutoring Course may be 15 years old or older."]},
  {t:"Massachusetts Age Restriction Guidelines",s:"ma",b:["• Students must be at least 15 and 9 months old to receive credit for any classroom sessions.","• Students must be at least 16 years old and hold a valid permit to receive credit for driving or observation lessons.","• Students may take up to 6 hours of driver's education instruction per day, only 2 of which can be in-car instruction.","• Students may enroll in a classroom course at age 15, provided the class starts after they turn 15 and 9 months. No credit will be given for classes taken before the student turns 15 and 9 months."]},
  {t:"Connecticut Digital Learning Policies",s:"ct",b:["Instructors reserve the right to revoke attendance for reasons including but not limited to: tardiness, disruption, lack of participation, technical issues, leaving early, and inappropriate behavior.","1. Participation: Students must participate in the full 2-hour Zoom session. Active participation includes responding to questions, engaging in group activities, and completing in-class quizzes.","2. Parent/Guardian Requirement: Students under 18 must be accompanied by a parent/guardian during the first session.","3. Signature Requirement: For students under 18, a parent/guardian must sign off on their attendance for the parent class — Session 1 in the Student Portal.","4. Quiz Requirement: Students must complete and pass a 10-question quiz with a score of 70% or higher after each session.","5. Display Name: Full legal name as it appears on the Learner's Permit must be used on Zoom.","6. Stable Network: Students must use a stationary device. If disconnected more than once, they will not receive credit.","7. Camera Policy: Cameras must be on, facing the student, and remain steady throughout class.","8. Learning Environment: Students must be seated upright in a well-lit, quiet space. No participating from a moving vehicle.","9. Attendance & Punctuality: Attendance checks at beginning, mid-session, and end of class. Tracked and recorded by The Next Street.","10. Focus: Avoid distractions such as checking phones or multitasking."]},
  {t:"Massachusetts Classroom Learning Policies",s:"ma",b:["Instructors reserve the right to revoke attendance for reasons including but not limited to: tardiness, disruption, lack of participation, technical issues, leaving early, and inappropriate behavior.","1. Participation: Students must participate in the full 2-hour session. Active participation includes responding to questions, group activities, and in-class quizzes.","2. Parent/Guardian Requirement: Students under 18 must have a parent/guardian complete a 2-hour parent class prior to booking any driving or observation lessons.","3. Signature Requirement: All students must sign off on their attendance for each class. Parent/guardian signature required for the Parent Class.","4. Exam Requirement: Students must pass a 50-question final exam with a score of 80% or higher. Completion of Classes 1–15 required before attempting the final exam.","5. Display Name: Full legal name must be used during online sessions.","6. Stable Network: Students must use a stationary device. If disconnected more than once, they will not receive credit.","7. Camera Policy: Cameras must be on, facing the student, and remain steady.","8. Learning Environment: Students must be in a well-lit, quiet space fully prepared to engage.","9. Attendance & Punctuality: Students must attend the entire class to receive credit.","10. Focus: Avoid distractions such as checking phones or multitasking."]},
  {t:"Driving Lesson Cancellations",s:"both",b:["Driving lessons must be canceled at least 24 hours in advance. Cancellations made within 24 hours will incur a $100.00 fee; however, students may reschedule their lesson. Cancellations must be made via the Student Portal."]},
  {t:"Driving Lesson Tardiness",s:"both",b:["• Students are granted a 30-minute grace period after the scheduled lesson start time. If a student arrives late, ends the lesson early, or if there is any disruption to the lesson, they will receive credit only for the portion of the lesson completed.","• Failure to arrive within 30 minutes will result in the lesson being forfeited in full, with no credit or refund issued. Any forfeiture of required time may delay license testing eligibility.","• For lessons involving observers, a 15-minute grace period applies. Failure to arrive within 15 minutes will result in forfeiture with no credit or refund.","• The Next Street does not offer partial driving lessons; all lessons are conducted in two-hour appointments."]},
  {t:"No-Show or Non-Compliant",s:"both",b:["Failure to attend a scheduled lesson, or arriving unprepared (e.g., without permit, required footwear, or corrective lenses), will result in lesson forfeiture with no credit or refund. If the forfeiture compromises a student's eligibility to test within a required timeframe, the student must purchase a new lesson to restore eligibility. Forfeiture may also impact testing eligibility in additional ways."]},
  {t:"Massachusetts Observer Policy",s:"ma",b:["If the original driver student is tardy or a no-show, the observer student will take the role of the driver student for the lesson. Observer students must arrive prepared to drive. If unable to assume the role of the driver, no-show or non-compliant policies apply."]},
  {t:"Required Items for Lessons",s:"both",b:["Students must bring the following items to each lesson, or the appointment will be canceled and forfeited:","• A physical permit or driver's license with photo identification — photocopies or electronic versions are prohibited.","• Glasses or contacts if required by a B restriction on the permit.","• Proper footwear as outlined in the Footwear Policy.","• Proper attire as outlined in the Attire Policy."]},
  {t:"Footwear Policy",s:"both",b:["Fully enclosed, sneaker-like shoes are mandatory for all lessons. Improper footwear can hinder a driver's ability to operate pedals safely, increasing the risk of accidents.","REQUIRED FOOTWEAR:","• Full Closure: Shoes must fully enclose the foot.","• Well-Fitting: Footwear should fit snugly without being too tight or too loose.","• Closed Toe and Closed Heel: Open-toe or open-heel footwear (sandals, flip-flops, high heels) is strictly prohibited.","• Flat Sole: Must have a flat, non-slip sole. High heels or excessively thick soles are not permitted.","SUITABLE: Athletic sneakers, flat closed-toe casual shoes, low-profile sturdy boots.","AVOID: Sandals, flip-flops, slippers, high heels, platform shoes, loose or ill-fitting shoes."]},
  {t:"Attire Policy",s:"both",b:["Students are expected to arrive for all classroom, driving lessons, and license tests in appropriate attire. Clothing must cover the midriff, chest, back, and undergarments at all times. Swimwear, beach attire, sleepwear, and clothing not suitable for an educational or professional environment is not permitted.","Students arriving in attire that does not meet these standards may be asked to reschedule their appointment, which may result in forfeiture."]},
  {t:"Support Devices",s:"both",b:["Individuals wearing any orthopedic support devices, such as casts, splints, or braces on any part of the body are prohibited from all driving lessons and road tests regardless of a medical professional's approval. These devices pose a safety risk during operation of a vehicle, impairing mobility and reaction time necessary for safe driving."]},
  {t:"Accessibility and Accommodations",s:"both",b:["The Next Street is committed to providing an inclusive learning environment. Students who require accommodations due to a disability or other qualifying condition are encouraged to notify The Next Street prior to enrollment.","Accommodation requests are reviewed on a case-by-case basis. All accommodations are subject to applicable state safety requirements and instructor assessment. The Next Street will make reasonable efforts to accommodate students; however, accommodations that compromise the safety of the student, instructor, or public cannot be provided.","To request an accommodation, please contact The Next Street Support."]},
  {t:"Cancellation Policy for Medical Reasons",s:"both",b:["At The Next Street, we understand that unexpected medical situations may arise. We offer fee waivers under certain circumstances.","1. Standard Cancellation Notice: Our standard policy requires a minimum of 24 hours' notice. If you need to cancel for medical reasons and cannot provide the required notice, we may waive this fee upon request and verification.","2. Medical Verification: We request a note from a healthcare provider confirming: (a) that a medical necessity prevented attendance, and (b) the date of the missed appointment. No specific medical details required.","HOW TO SUBMIT: Send the doctor's note via the Student Portal within 2 days of the missed appointment. Processing time: 3–5 business days."]},
  {t:"Inclement Weather Cancellations",s:"both",b:["In the event of inclement weather, classroom and driving lesson cancellations will be determined by The Next Street. License test cancellations are determined by the DMV and RMV. We will notify students via email and SMS. For class and lesson cancellations, students are responsible for rescheduling through the Student Portal. License test cancellations will include additional guidance for rescheduling."]},
  {t:"In-Vehicle Participants",s:"both",b:["Only enrolled students, instructors, state officials, or Company trainees may be present in the training vehicle during instruction.","• Parents, guardians, or any unauthorized third parties are strictly prohibited from participating in or observing in-car lessons.","• From time to time, a trainee instructor may be present in the vehicle for observational or training purposes. Advance notice is not required.","• Trainees are required to remain professional and non-disruptive throughout the duration of any session."]},
  {t:"Late Pick-Up Policy",s:"both",b:["1. Pick-Up and Drop-Off Locations: Lessons begin and end at designated pick-up/drop-off locations communicated in advance and available in the Student Portal.","2. Responsibility for Timely Pick-Up: Parents or guardians are required to arrange appropriate transportation to be picked up immediately at the end of each lesson.","3. Instructor Waiting Time: Instructors will remain with students for a maximum of 15 minutes following the end of their lesson.","4. Procedure for Late Pick-Up: After the 15-minute grace period, if no transportation is available, the instructor will no longer be responsible for supervising the student.","5. Contact Local Authorities: If the parent or guardian does not arrive within the 15-minute grace period and we are unable to reach them, we may contact local authorities."]},
  {t:"License Testing Policies",s:"both",b:["The Next Street provides the use of its vehicle and designated test locations; however, all license exams are administered exclusively by state-appointed agents of the DMV or RMV.","• The Next Street does not control or influence test outcomes.","• All licensing decisions are made solely at the discretion of the state testing agent.","• Any disputes must be directed to the applicable state licensing agency."]},
  {t:"Connecticut License Testing Eligibility",s:"ct",b:["Students must complete a minimum of two hours of driving lessons at least five days prior to the test date. No classes or lessons may be scheduled within the five days leading up to the test.","TEENS — Under 18: Must hold learner's permit for 120 days (Full Driver's Education Program) or 180 days (8 Hour Safe Driving Course).","ADULTS — Over 18: Must hold learner's permit for 90 days and complete the 8 Hour Safe Driving Course."]},
  {t:"Connecticut License Test Cancellations & No-Shows",s:"ct",b:["License test cancellations must be made 5 days in advance via the Student Portal. Late cancellations will incur a $100 fee, which includes a $40 fee The Next Street pays to the DMV on your behalf. No-shows will result in forfeiture of the test service and a $40.00 DMV Fee to be paid by the student.","Required Items: As outlined in Driving Lesson Policy.","Retest Fees: $190 including the $40.00 DMV fee."]},
  {t:"Massachusetts License Testing Eligibility",s:"ma",b:["Students under 18 must complete the Full Driver Education Course. Students over 18 must complete at least one 2-hour driving lesson.","TEENS — Under 18: Must hold a learner's permit for 6 months from the date of issue; complete the Full Driver's Education Program; be at least 16½ years old.","ADULTS — Over 18: Must hold a valid learner's permit and complete at least a 2-hour driving lesson."]},
  {t:"Massachusetts License Test Cancellations & No-Shows",s:"ma",b:["License test cancellations must be made 72 hours in advance via the Student Portal. Late cancellations will incur a $35.00 fee. No-shows will result in forfeiture of the test service with no credit or refund issued.","Required Items: As outlined in Driving Lesson Policy."]},
  {t:"Connecticut e-DEC Guidelines",s:"ct",b:["The e-DEC will be uploaded to the Student Portal within 5–7 days after completion of requirements. Students are responsible for eDEC record keeping (downloadable from the student portal).","REQUIREMENTS:","• Pass all classroom quizzes with a score of 70% or higher","• Parental or guardian signature for Parent Class (for minors)","• Provide a valid CT permit number","• Complete all required courses","• Account must be paid in full"]},
  {t:"Massachusetts Driver's Education Certificate Guidelines",s:"ma",b:["Completion Certificates are filed directly with the RMV and are not sent directly to the student.","REQUIREMENTS:","• Pass the final exam with a score of 80% or higher","• If under 18, a parent or guardian must complete the Parent Class","• Provide a valid MA permit number","• Complete all required courses and obtain all necessary signatures","• Account must be paid in full"]},
  {t:"Account Deactivation Guidelines",s:"both",b:["Students have up to 24 months to complete their program. After this period, all purchased services will expire, and access to services will be discontinued. Unused services will be forfeited.","CONNECTICUT EXCEPTION: Students may request a 6-month account freeze by contacting The Next Street Support. Freeze requests are subject to review and approval. Each student is eligible for one account freeze per enrollment period."]},
  {t:"Record Retention",s:"both",b:["The Next Street will retain student records only for the duration and scope required to comply with applicable state regulations. Records may be securely destroyed once retention requirements have been met."]},
  {t:"Payment and Account Balance Policy",s:"both",b:["All outstanding fees must be paid within 30 days of the assessment date. The Next Street reserves the right to apply the value of any unused services toward any outstanding balance, at its discretion and without prior notice. Scheduled appointments may be subject to cancellation if there are unpaid fees on the account. Unused services will be forfeited upon account expiration. Completion certificates will not be issued if there is an outstanding balance on the account."]},
  {t:"Returned Payment and Chargeback Policy",s:"both",b:["In the event that a payment is returned, declined, or reversed for any reason (including insufficient funds, a stopped check, or a credit card chargeback), The Next Street reserves the right to:","• Assess a $35.00 returned payment fee per occurrence.","• Cancel any services until the outstanding balance, including the returned payment fee, is resolved in full.","In the case of a chargeback initiated without first contacting The Next Street, The Next Street reserves the right to pursue recovery through available legal channels."]},
  {t:"Refund Guidelines",s:"both",b:["BUNDLES: Non-refundable and non-transferable. This includes the Full Driver Education Bundle, 8 & 8 Bundle, and the Easy as 123 Bundle.","A LA CARTE: Refund eligible up to 45 days from purchase date, subject to a 10% processing fee calculated on the original purchase price.","GIFT CERTIFICATES: Non-refundable, non-transferable, and do not expire. However, they may not cover the full cost of enrollment if time has passed since purchase."]},
  {t:"Communication Guidelines",s:"both",b:["If you opt out of communications, you are still responsible for adhering to the content of those messages. All communications from The Next Street are provided as a courtesy. The Next Street is not liable for any missed appointments due to the absence of such reminders. The Next Street may cancel appointments and notify students via SMS or email. It is the student's sole responsibility to manage their appointments by regularly checking their Student Portal."]},
  {t:"Privacy and Data Collection",s:"both",b:["The Next Street collects and processes personal information, including permit numbers, contact details, medical verification documents, session recordings, and Student Portal activity, in order to administer its driver training programs and comply with applicable state regulations.","By enrolling, students and their parents or guardians consent to the collection and use of personal data as described in The Next Street's Privacy Policy. The Next Street does not sell personal information to third parties. Data is retained only as long as required by applicable law or operational necessity."]},
  {t:"Third-Party Platform Terms",s:"both",b:["Certain components of The Next Street's program, including online classroom sessions, are delivered through third-party platforms such as Zoom. Use of these platforms is subject to the respective platform's own terms of service and privacy policy.","The Next Street is not responsible for technical outages, interruptions, data breaches, or any other issues arising from third-party platforms. In the event of a platform outage or technical failure beyond The Next Street's control, affected sessions will be rescheduled at no additional cost to the student."]},
  {t:"Dispute Resolution and Governing Law",s:"both",b:["These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Connecticut. Students enrolled under Massachusetts state regulations may also have rights governed by Massachusetts law.","In the event of a dispute, the parties agree to first attempt to resolve the dispute informally by contacting The Next Street directly. If the dispute cannot be resolved informally within 30 days, either party may pursue resolution through the appropriate state courts or, where mutually agreed, through binding arbitration.","Nothing in this section limits a student's right to file a complaint with the Connecticut Department of Motor Vehicles or the Massachusetts Registry of Motor Vehicles."]},
  {t:"Amendment of Terms",s:"both",b:["The Next Street reserves the right to modify, update, or amend these Terms and Conditions at any time. Students will be notified of material changes via email or through the Student Portal at least 14 days prior to the changes taking effect. Continued participation constitutes acceptance of the revised terms."]},
  {t:"Intellectual Property",s:"both",b:["All course materials, curriculum, instructional content, quizzes, videos, and other resources provided by The Next Street are the exclusive intellectual property of The Next Street and are protected by applicable copyright and intellectual property laws.","Students are granted a limited, non-transferable license to access and use these materials solely for the purpose of completing their enrolled driver training program. Students may not reproduce, distribute, share, sell, or otherwise use these materials without the express written consent of The Next Street."]},
  {t:"Recording",s:"both",b:["For the safety of our customers and employees, as well as for training and quality assurance purposes, all driving lessons, classroom sessions, and/or license tests conducted by The Next Street, and phone calls may be video and/or audio recorded. These recordings are retained in accordance with public record laws."]},
  {t:"Parent and Guardian Responsibility",s:"both",b:["For students under the age of 18, the parent or guardian who signs this agreement on the student's behalf accepts full financial and legal responsibility for the student's compliance with these Terms and Conditions, including:","• Payment of all enrollment fees, cancellation fees, and any other charges incurred by the student.","• Ensuring the student adheres to all conduct, attendance, and safety requirements set forth in this agreement.","• Ensuring appropriate supervision and transportation arrangements, including timely drop off and pick-up for appointments.","By signing this agreement, the parent or guardian acknowledges that they have read, understood, and agreed to these terms on behalf of the minor student."]}
];

const TC_DOC = SECTIONS.map(s => `${s.t}: ${s.b.join(' ')}`).join('\n\n');

const GROUPS = [
  { label: 'General', icon: '📋', titles: ["Enrollment","Assumption of Risk and Waiver of Liability","Requirements and State Compliance","Safety and Instructor Discretion","Disciplinary Code of Conduct","Accessibility and Accommodations","Support Devices","Attire Policy","Footwear Policy","In-Vehicle Participants","Late Pick-Up Policy","Inclement Weather Cancellations","Communication Guidelines","Privacy and Data Collection","Third-Party Platform Terms","Dispute Resolution and Governing Law","Amendment of Terms","Intellectual Property","Recording","Parent and Guardian Responsibility","Record Retention","Payment and Account Balance Policy","Returned Payment and Chargeback Policy","Refund Guidelines"] },
  { label: 'Classroom', icon: '🎓', titles: ["Connecticut Age Restriction Guidelines","Massachusetts Age Restriction Guidelines","Connecticut Digital Learning Policies","Massachusetts Classroom Learning Policies"] },
  { label: 'Driving Lessons', icon: '🚗', titles: ["Driving Lesson Cancellations","Driving Lesson Tardiness","No-Show or Non-Compliant","Massachusetts Observer Policy","Required Items for Lessons","Cancellation Policy for Medical Reasons","Account Deactivation Guidelines"] },
  { label: 'License Testing', icon: '📄', titles: ["License Testing Policies","Connecticut License Testing Eligibility","Connecticut License Test Cancellations & No-Shows","Massachusetts License Testing Eligibility","Massachusetts License Test Cancellations & No-Shows","Connecticut e-DEC Guidelines","Massachusetts Driver's Education Certificate Guidelines"] }
];

const SUGGESTIONS = [
  "What is the cancellation fee for a driving lesson?",
  "What are the age requirements in Massachusetts?",
  "What footwear is required for lessons?",
  "What is the refund policy for A La Carte services?",
  "Can a student with a cast attend a driving lesson?",
  "What are the CT license test cancellation rules?"
];

function highlight(text, q) {
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase()
      ? <mark key={i} style={{ background: '#FFF0B3', borderRadius: 2, padding: '0 2px' }}>{p}</mark>
      : p
  );
}

function countHits(s, q) {
  if (!q) return 0;
  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return ((s.t + ' ' + s.b.join(' ')).match(re) || []).length;
}

function matches(s, q) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return s.t.toLowerCase().includes(lq) || s.b.join(' ').toLowerCase().includes(lq);
}

function StateBadge({ state }) {
  const styles = {
    both: { background: '#FEF3E7', color: '#F58A21' },
    ct:   { background: '#E8F7FA', color: '#29A3BD' },
    ma:   { background: '#EEF8E4', color: '#3B6D11' }
  };
  const labels = { both: 'CT + MA', ct: 'CT', ma: 'MA' };
  return (
    <span style={{ ...styles[state], fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, flexShrink: 0 }}>
      {labels[state]}
    </span>
  );
}

function SectionBody({ lines, q }) {
  return lines.map((line, i) => {
    const isHeader = /^[A-Z\s&—']+:$/.test(line.trim());
    const isBullet = line.startsWith('•');
    const isNum = /^\d+\./.test(line);
    if (isHeader) return (
      <div key={i} style={{ fontSize: 11, fontWeight: 700, color: '#3B3B3B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '12px 0 5px', background: '#F0EFEB', padding: '4px 8px', borderRadius: 4, display: 'inline-block' }}>
        {highlight(line, q)}
      </div>
    );
    if (isBullet) return <li key={i} style={{ marginBottom: 3 }}>{highlight(line.slice(1).trim(), q)}</li>;
    if (isNum) return <li key={i} style={{ marginBottom: 3 }}>{highlight(line.replace(/^\d+\./, '').trim(), q)}</li>;
    return <p key={i} style={{ marginBottom: 6 }}>{highlight(line, q)}</p>;
  });
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 2px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: '#999',
          animation: 'blink 1.2s infinite', animationDelay: `${i * 0.2}s`
        }} />
      ))}
    </div>
  );
}

export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('browse');
  const [messages, setMessages] = useState([{ role: 'ai', text: "Hi! I'm your T&C reference assistant. Ask me anything about The Next Street's policies — cancellations, refunds, age requirements, footwear, testing eligibility, and more." }]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_ANTHROPIC_KEY || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const msgsEndRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => { msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const filteredSections = query ? SECTIONS.map((s, i) => ({ s, i })).filter(({ s }) => matches(s, query)) : null;

  function selectSection(i) {
    setActiveIdx(i);
    setQuery('');
  }

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setChatInput('');
    setShowSuggestions(false);
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);

    if (!apiKey) {
      setMessages(m => [...m, { role: 'ai', text: '⚠️ No API key set. Click the key icon (🔑) in the chat header to add your Anthropic API key.' }]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful staff reference assistant for The Next Street, a driver education company in Connecticut and Massachusetts. Answer questions about the company's Terms and Conditions clearly and concisely. Use the T&C document below as your sole source. Give direct practical answers. State exact fees and timeframes. If a policy differs between CT and MA, note both. Use bullet points for lists. Do not make up anything not in the document.\n\nT&C DOCUMENT:\n${TC_DOC}`,
          messages: [{ role: 'user', content: userMsg }]
        })
      });
      const data = await res.json();
      const answer = data.content?.[0]?.text || 'Sorry, I could not get a response.';
      setMessages(m => [...m, { role: 'ai', text: answer }]);
    } catch {
      setMessages(m => [...m, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }]);
    }
    setLoading(false);
  }

  const C = {
    orange: '#F58A21', blue: '#29A3BD', charcoal: '#3B3B3B',
    bg: '#F7F6F3', surface: '#FFFFFF', surface2: '#F0EFEB',
    text: '#3B3B3B', text2: '#4A4A4A', text3: '#777',
    border: 'rgba(0,0,0,0.08)', border2: 'rgba(0,0,0,0.14)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.text, WebkitFontSmoothing: 'antialiased' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%,80%,100%{opacity:.2} 40%{opacity:1} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        mark { background: #FFF0B3; border-radius: 2px; padding: 0 2px; }
        a { color: inherit; }
      `}</style>

      {/* TOPBAR */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '0 16px', height: 52, display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, background: C.orange, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(245,138,33,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M8 1L2 5v6l6 4 6-4V5L8 1zm0 1.8l4 2.7v4.8L8 13l-4-2.7V5.5L8 2.8z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>T&C Reference</div>
            <div style={{ fontSize: 10, color: C.text3 }}>The Next Street · Staff Tool</div>
          </div>
        </div>

        <div style={{ width: 1, height: 20, background: C.border2, flexShrink: 0 }} />

        <div style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: C.text3, pointerEvents: 'none' }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3 3"/></svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search policies..."
            style={{ width: '100%', height: 34, padding: '0 32px 0 34px', border: `1px solid ${C.border2}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: C.surface2, color: C.text, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = C.orange}
            onBlur={e => e.target.style.borderColor = C.border2}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.text3, fontSize: 17, lineHeight: 1, fontFamily: 'inherit' }}>×</button>
          )}
        </div>

        <div style={{ marginLeft: 'auto' }} />

        <div style={{ display: 'flex', gap: 3, background: C.surface2, padding: 3, borderRadius: 8, border: `1px solid ${C.border}`, flexShrink: 0 }}>
          {['browse', 'chat'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '5px 14px', border: tab === t ? `1px solid ${C.border}` : '1px solid transparent', background: tab === t ? C.surface : 'none', borderRadius: 6, fontSize: 12, fontWeight: tab === t ? 600 : 400, cursor: 'pointer', color: tab === t ? C.text : C.text2, fontFamily: 'inherit', boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', whiteSpace: 'nowrap' }}>
              {t === 'browse' ? 'Browse' : 'AI Agent'}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR */}
        <div style={{ width: 220, background: C.surface, borderRight: `1px solid ${C.border}`, overflowY: 'auto', flexShrink: 0, padding: '6px 0 16px' }}>
          {GROUPS.map(group => {
            const items = group.titles.map(title => ({ s: SECTIONS.find(x => x.t === title), i: SECTIONS.findIndex(x => x.t === title) })).filter(x => x.s && matches(x.s, query));
            if (!items.length) return null;
            return (
              <div key={group.label}>
                <div style={{ margin: '10px 10px 4px', padding: '8px 10px', fontSize: 11, fontWeight: 600, color: C.text, background: C.surface2, borderRadius: 8, borderLeft: `3px solid ${C.orange}`, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13 }}>{group.icon}</span>
                  {group.label}
                </div>
                {items.map(({ s, i }) => {
                  const n = countHits(s, query);
                  return (
                    <div key={i} onClick={() => selectSection(i)} style={{ padding: '7px 14px 7px 16px', fontSize: 13, cursor: 'pointer', color: i === activeIdx && !query ? C.orange : query && n ? C.blue : C.text2, lineHeight: 1.35, borderLeft: `2px solid ${i === activeIdx && !query ? C.orange : 'transparent'}`, background: i === activeIdx && !query ? '#FEF3E7' : 'transparent', fontWeight: i === activeIdx && !query ? 600 : 400, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4, transition: 'all 0.1s' }}
                      onMouseEnter={e => { if (i !== activeIdx || query) e.currentTarget.style.background = '#FAF9F7'; }}
                      onMouseLeave={e => { if (i !== activeIdx || query) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span>{highlight(s.t, query)}</span>
                      {query && n > 0 && <span style={{ background: '#E8F7FA', color: C.blue, fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 10, flexShrink: 0, marginTop: 1 }}>{n}</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', background: C.bg }}>
          {filteredSections ? (
            <>
              {filteredSections.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: C.text3, fontSize: 13 }}>No sections match "<strong style={{ color: C.text2 }}>{query}</strong>"</div>
              ) : (
                <>
                  <div style={{ fontSize: 11, color: C.text3, marginBottom: 12, fontWeight: 500 }}>{filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''} matching "{query}"</div>
                  {filteredSections.map(({ s, i }) => (
                    <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{highlight(s.t, query)}</span>
                        <StateBadge state={s.s} />
                      </div>
                      <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.85 }}>
                        <ul style={{ paddingLeft: 18, listStyle: 'disc' }}>
                          <SectionBody lines={s.b} q={query} />
                        </ul>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <div style={{ background: C.surface, border: `1px solid ${C.orange}`, borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{SECTIONS[activeIdx].t}</span>
                <StateBadge state={SECTIONS[activeIdx].s} />
              </div>
              <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.85 }}>
                <ul style={{ paddingLeft: 18, listStyle: 'disc' }}>
                  <SectionBody lines={SECTIONS[activeIdx].b} q={''} />
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* CHAT PANEL */}
        {tab === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', width: 320, borderLeft: `1px solid ${C.border}`, background: C.surface, flexShrink: 0 }}>
            <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ width: 30, height: 30, background: C.orange, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0, boxShadow: '0 2px 6px rgba(245,138,33,0.3)' }}>TC</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>T&C Assistant</div>
                <div style={{ fontSize: 10, color: C.text3 }}>Powered by Claude · TNS policies only</div>
              </div>
              <button onClick={() => setShowKeyInput(v => !v)} title="Set API Key" style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, opacity: 0.5 }}>🔑</button>
            </div>

            {showKeyInput && (
              <div style={{ padding: '10px 12px', borderBottom: `1px solid ${C.border}`, background: '#FFFBF5' }}>
                <div style={{ fontSize: 11, color: C.text3, marginBottom: 5 }}>Enter your Anthropic API key:</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-ant-..." style={{ flex: 1, padding: '5px 8px', border: `1px solid ${C.border2}`, borderRadius: 6, fontSize: 12, fontFamily: 'inherit', outline: 'none' }} />
                  <button onClick={() => setShowKeyInput(false)} style={{ padding: '5px 10px', background: C.orange, border: 'none', borderRadius: 6, color: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
                </div>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', maxWidth: '92%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ padding: '9px 12px', borderRadius: 14, fontSize: 13, lineHeight: 1.6, wordBreak: 'break-word', background: m.role === 'user' ? C.orange : C.surface2, color: m.role === 'user' ? 'white' : C.text, borderBottomRightRadius: m.role === 'user' ? 3 : 14, borderBottomLeftRadius: m.role === 'ai' ? 3 : 14, border: m.role === 'ai' ? `1px solid ${C.border}` : 'none' }}>
                    {m.text.split('\n').map((line, j) => <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>)}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: 'flex-start' }}>
                  <div style={{ padding: '9px 12px', borderRadius: 14, background: C.surface2, border: `1px solid ${C.border}`, borderBottomLeftRadius: 3 }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={msgsEndRef} />
            </div>

            {showSuggestions && (
              <div style={{ padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 5, borderTop: `1px solid ${C.border}`, background: '#FAFAF8' }}>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)} style={{ background: C.surface, border: `1px solid ${C.border2}`, borderRadius: 20, padding: '4px 10px', fontSize: 11, cursor: 'pointer', color: C.text2, fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { e.target.style.borderColor = C.orange; e.target.style.color = C.orange; }}
                    onMouseLeave={e => { e.target.style.borderColor = C.border2; e.target.style.color = C.text2; }}
                  >{s}</button>
                ))}
              </div>
            )}

            <div style={{ padding: '10px 12px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 7, flexShrink: 0, background: C.surface }}>
              <textarea
                ref={chatInputRef}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput); } }}
                placeholder="Ask about any policy..."
                rows={1}
                style={{ flex: 1, padding: '8px 11px', border: `1px solid ${C.border2}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: C.surface2, color: C.text, outline: 'none', resize: 'none', height: 36 }}
                onFocus={e => e.target.style.borderColor = C.orange}
                onBlur={e => e.target.style.borderColor = C.border2}
              />
              <button onClick={() => sendMessage(chatInput)} disabled={loading} style={{ width: 36, height: 36, background: C.orange, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: loading ? 0.4 : 1, boxShadow: '0 2px 6px rgba(245,138,33,0.3)' }}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
