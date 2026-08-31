const chapter = (id, title, topic, principle, action, risk, boundary, evidence) => ({ id, title, topic, principle, action, risk, boundary, evidence });

const chapterSpecs = [
  chapter('01', 'What an Agent Actually Is', 'Foundations', 'An agent is a goal-directed loop around a model, tools, and state.', 'Define a clear goal and bounded toolset.', 'Treating autonomy as magic hides failure modes.', 'A single response is not an agentic system.', 'Observe–think–act–evaluate behavior.'),
  chapter('02', 'The Model as a Component', 'Foundations', 'The model is a component with context, latency, cost, and reliability limits.', 'Allocate reasoning and context budgets deliberately.', 'Treating the model as the whole system creates brittle designs.', 'A model is not a durable database or security boundary.', 'Measured cost, latency, and task quality.'),
  chapter('03', 'Anatomy of an Agent Harness', 'Foundations', 'The harness coordinates model calls, state, tools, policy, and control flow.', 'Make system responsibilities explicit in the harness.', 'Relying on one giant prompt leaves behavior ungoverned.', 'The harness is not merely a prompt template.', 'Inspectable state transitions and tool decisions.'),
  chapter('04', 'The Agent Loop', 'Orchestration & State', 'Agents progress through observe, think, act, and evaluate cycles.', 'Evaluate whether each action moved toward the goal before continuing.', 'Blind loops waste tokens and repeat mistakes.', 'A tool call without evaluation is not reliable progress.', 'A trace shows the loop’s state and stop reason.'),
  chapter('05', 'Durable State & Resumption', 'Orchestration & State', 'Durable state lets work resume without replaying side effects.', 'Checkpoint state and make external actions idempotent.', 'Crashes can duplicate payments, messages, or writes.', 'Conversation history alone is not durable workflow state.', 'A resumed run recognizes completed work safely.'),
  chapter('06', 'Planning, Decomposition & Task Graphs', 'Orchestration & State', 'Complex goals need explicit tasks and dependency structure.', 'Break goals into validated, executable units.', 'Unvalidated plans can execute unsafe or irrelevant work.', 'A task graph is more than a long linear prompt.', 'Dependencies, owners, and completion criteria are visible.'),
  chapter('07', 'Orchestration Patterns', 'Orchestration & State', 'Use the simplest orchestration pattern that matches uncertainty.', 'Route, sequence, parallelize, or escalate only when justified.', 'Unnecessary agents add coordination cost and failure paths.', 'Deterministic workflows should not be replaced by agents casually.', 'Each pattern has a clear input, output, and stop condition.'),
  chapter('08', 'Context Engineering', 'Context & Knowledge', 'Context is a limited working budget that must be curated.', 'Select current, relevant evidence and instructions deliberately.', 'Overloading context dilutes signal and raises cost.', 'More context is not automatically better context.', 'Critical constraints are present when decisions are made.'),
  chapter('09', 'Compaction & the Long Horizon', 'Context & Knowledge', 'Long tasks require compact state that retains decisions and open work.', 'Summarize task-relevant history at durable boundaries.', 'Unbounded history eventually buries essential information.', 'Compaction is not indiscriminate deletion.', 'The agent can continue coherently beyond one context window.'),
  chapter('10', 'Memory Architectures', 'Context & Knowledge', 'Memory needs purpose, provenance, freshness, access, and expiration rules.', 'Separate transient scratch work from durable user or system memory.', 'Stale or sensitive memory can mislead behavior and harm privacy.', 'Memory is not simply a transcript kept forever.', 'Stored information can be traced, updated, or forgotten.'),
  chapter('11', 'Retrieval & RAG for Agents', 'Context & Knowledge', 'Retrieval is an evidence-gathering action an agent can choose and refine.', 'Evaluate query, ranking, source quality, and grounding separately.', 'Irrelevant retrieval produces confidently unsupported answers.', 'RAG does not put changing documents into model weights.', 'Answers cite or otherwise connect to retrieved evidence.'),
  chapter('12', 'Knowledge Graphs & Structured Memory', 'Context & Knowledge', 'Knowledge graphs help when relationships and multi-hop dependencies are the answer.', 'Model entities and edges explicitly when structure matters.', 'Flat chunks can hide important relationships.', 'A graph is not a replacement for all document retrieval.', 'A query can traverse relevant relationships transparently.'),
  chapter('13', 'Tool Calling from First Principles', 'Tools & Action', 'Tools need explicit schemas, validation, outputs, and actionable errors.', 'Use narrow contracts that make valid calls predictable.', 'Ambiguous tools lead to malformed or unsafe actions.', 'A tool schema does not itself grant permission.', 'Calls can be validated and failures handled programmatically.'),
  chapter('14', 'Tool Ecosystems at Scale', 'Tools & Action', 'Large tool ecosystems require discovery, routing, and curation.', 'Expose only relevant tools and use standards such as MCP where appropriate.', 'Too many choices degrade selection and expand attack surface.', 'Protocol interoperability is not automatic trust.', 'The agent selects from a small, appropriate capability set.'),
  chapter('15', 'Permissions, Sandboxing & Least Privilege', 'Tools & Action', 'Agent capabilities must be limited to the smallest necessary authority.', 'Separate read, draft, and consequential write privileges.', 'Overprivileged agents turn errors or injections into larger incidents.', 'A system prompt is not an authorization system.', 'Access decisions are scoped, logged, and enforceable.'),
  chapter('16', 'Code Execution as the Universal Tool', 'Tools & Action', 'Code execution is powerful because it can transform data and orchestrate action.', 'Sandbox execution with resource, network, and filesystem limits.', 'Unbounded code execution creates a large blast radius.', 'Code execution is not inherently safe because it is automated.', 'Resource use and allowed capabilities are constrained.'),
  chapter('17', 'Executing on Multimodal Content', 'Modality & Human', 'Agents acting on images, PDFs, audio, and artifacts need modality-aware validation.', 'Preserve provenance and verify extraction before acting.', 'Hidden content or extraction errors can distort decisions.', 'Text conversion does not erase source risk or uncertainty.', 'The system records what artifact and extraction informed an action.'),
  chapter('18', 'Voice & Real-Time Agents', 'Modality & Human', 'Voice agents are governed by latency, turn-taking, and interruption handling.', 'Design for barge-in, concise turns, and safe spoken tool use.', 'Slow or unstoppable behavior destroys conversational trust.', 'Voice is not just text with audio attached.', 'The agent handles interruption and response timing gracefully.'),
  chapter('19', 'Human Approvals, Escalation & Handoff', 'Modality & Human', 'Humans should approve high-impact uncertainty and receive useful context.', 'Package evidence, proposed action, uncertainty, and rollback options for handoff.', 'Vague escalation forces the human to reconstruct the case.', 'Human-in-the-loop is not a meaningless approval button.', 'An authorized person can make an informed decision quickly.'),
  chapter('20', 'Guardrails & Stop Conditions', 'Safety & Failure', 'Guardrails bound behavior, authority, spend, and runtime across layers.', 'Define stop conditions before the loop begins.', 'An agent that cannot stop can waste money or cause harm.', 'One prompt instruction is not a complete guardrail strategy.', 'Runs end safely when progress, policy, or budget conditions fail.'),
  chapter('21', 'Prompt Injection & Adversarial Agents', 'Safety & Failure', 'Untrusted content plus sensitive access and powerful tools is a high-risk combination.', 'Treat external content as data, isolate it, and restrict downstream authority.', 'Injected instructions can become harmful tool actions.', 'A larger model does not remove the need for defense in depth.', 'Untrusted text cannot directly authorize consequential action.'),
  chapter('22', 'Retries, Recovery & Failure Handling', 'Safety & Failure', 'Recovery policies must distinguish transient, unsafe, and permanent failures.', 'Use bounded retries, backoff, idempotency, and escalation.', 'Blind retries can duplicate side effects and amplify outages.', 'Retrying is not a substitute for error classification.', 'Failures lead to a safe next state or clear handoff.'),
  chapter('23', 'Observability & Tracing', 'Measurement & Improvement', 'Traces make multi-step behavior inspectable and debuggable.', 'Record state, model/tool calls, outputs, cost, latency, approvals, and stop reasons.', 'Without traces, silent failure patterns remain invisible.', 'Final-answer logging alone is insufficient for agents.', 'Engineers can reconstruct why a run behaved as it did.'),
  chapter('24', 'Evaluation Frameworks & Metrics', 'Measurement & Improvement', 'Agent evaluation measures outcomes and trajectories, not fluent answers alone.', 'Test representative tasks, edge cases, safety, tool use, cost, and reliability.', 'Demo success can conceal unsafe production behavior.', 'A single accuracy number is not a complete agent evaluation.', 'Success criteria are explicit and repeatable.'),
  chapter('25', 'Prompt Iteration & Feedback Loops', 'Measurement & Improvement', 'Prompt improvement should follow error analysis and controlled evaluation.', 'Change one meaningful variable and measure regressions as well as gains.', 'Anecdotal prompt tuning creates accidental regressions.', 'Longer prompts are not automatically better prompts.', 'Changes improve defined evaluation results consistently.'),
  chapter('26', 'Self-Improvement', 'Measurement & Improvement', 'Self-improvement refines reusable prompts, tools, skills, or memory under controls.', 'Validate and govern changes before they affect production behavior.', 'Unreviewed self-modification can compound failures.', 'Self-improvement is not permission to bypass policy.', 'An improvement has evidence of benefit and a rollback path.'),
  chapter('27', 'Self-Learning', 'Measurement & Improvement', 'Self-learning changes behavior from trajectories or data, requiring rigorous evaluation.', 'Treat new learning data, feedback, and updates as governed artifacts.', 'Learning from noisy behavior can amplify bias or error.', 'Self-learning is not the same as simple prompt refinement.', 'New behavior is measured against a held-out evaluation set.'),
  chapter('28', 'Multi-Agent Coordination', 'Production & Governance', 'Multiple agents need explicit roles, contracts, and a reason to exist.', 'Use multi-agent topology only when specialization or parallelism earns its cost.', 'Unclear handoffs create loops, duplication, and accountability gaps.', 'More agents are not automatically more capable.', 'Each agent has bounded authority and a defined output contract.'),
  chapter('29', 'From Prototype to Production', 'Production & Governance', 'Production agents require tenancy, rollout, capacity, cost, operations, and rollback discipline.', 'Progressively release and observe behavior under realistic load.', 'A polished demo is not evidence of production readiness.', 'Production readiness is more than model quality.', 'The system can be operated, measured, and safely rolled back.'),
  chapter('30', 'Enterprise Governance & Compliance', 'Production & Governance', 'Enterprise deployment connects identity, policy, data residency, audit, and accountability.', 'Encode governance as enforceable controls across the lifecycle.', 'Informal policy cannot reliably govern autonomous behavior at scale.', 'Compliance is not a final checklist added after launch.', 'An audit can show who accessed what, why, and under which policy.'),
];

const wrongs = (spec) => [
  `Ignore ${spec.risk.toLowerCase()}`,
  `Assume ${spec.boundary.toLowerCase()}`,
  `Optimize only for a fluent final answer`,
];

const makeQuestion = (spec, index, prompt, correct, explanation, contrast = '') => ({
  id: `chapter-${spec.id}-${String(index + 1).padStart(2, '0')}`,
  chapterId: spec.id,
  topic: spec.topic,
  difficulty: index % 5 === 0 ? 3 : index % 2 === 0 ? 2 : 1,
  mode: 'chapter',
  prompt,
  choices: [correct, ...wrongs(spec)],
  correctIndex: 0,
  explanation,
  contrast,
});

const buildExam = (spec) => [
  ['Which statement best captures this chapter’s central idea?', spec.principle, spec.principle],
  ['What is the most appropriate first design action?', spec.action, `The action follows from the chapter principle: ${spec.principle}`],
  [`What failure is this chapter designed to prevent?`, spec.risk, `The chapter emphasizes this risk: ${spec.risk}`],
  ['Which boundary should an architect preserve?', spec.boundary, `This distinction prevents a category error: ${spec.boundary}`],
  ['What is the strongest observable sign of success?', spec.evidence, `Evidence should be observable, not merely asserted.`],
  [`A team says, “We can skip design because the model is capable.” What is the best response?`, spec.principle, `Model capability does not remove the need for system design.`],
  [`Which control most directly reduces the chapter’s primary risk?`, spec.action, `The recommended action addresses the stated risk.`],
  [`Which option is a tempting but incorrect simplification?`, spec.boundary, `The chapter explicitly rejects this simplification.`],
  ['For a production decision, what evidence should be inspected?', spec.evidence, `The right evidence makes the system governable.`],
  [`A design review reveals that the team has ignored this concern: ${spec.risk} What should change?`, spec.action, `Use the chapter’s recommended action rather than treating the concern as cosmetic.`],
  ['Which statement best separates this concept from a weaker alternative?', spec.boundary, `This boundary is central to correct application.`],
  ['What outcome would indicate that the principle is working?', spec.evidence, `The chapter’s success signal is ${spec.evidence.toLowerCase()}`],
  ['Which design choice is most aligned with the chapter?', spec.action, `This is the concrete implementation of the chapter’s lesson.`],
  ['What should not be assumed?', spec.boundary, `Avoid confusing the concept with its weaker look-alike.`],
  ['Which risk should be raised in an architecture review?', spec.risk, `This is the operational risk the chapter foregrounds.`],
  [`A stakeholder asks for speed at any cost. Which response is most defensible?`, spec.principle, `The core principle protects reliability while preserving useful capability.`],
  ['What should be documented or measured?', spec.evidence, `Measurement turns the principle into a testable operating practice.`],
  ['Which next step is safest under uncertainty?', spec.action, `The chapter’s action is designed for uncertainty and control.`],
  ['Which claim would the chapter reject?', spec.boundary, `The boundary identifies a misleading claim to reject.`],
  ['What is the relevant failure mode?', spec.risk, `Naming the failure mode helps select the right control.`],
  ['What is the core operating rule?', spec.principle, `This is the chapter’s compact decision rule.`],
  ['Which practice scales this concept responsibly?', spec.action, `The action operationalizes the concept at scale.`],
  ['What makes a result trustworthy here?', spec.evidence, `Trust depends on observable evidence, not confidence alone.`],
  ['Which distinction is most important to explain to a teammate?', spec.boundary, `Teaching this distinction prevents common misuse.`],
  ['What concern should remain visible after launch?', spec.risk, `The risk persists operationally and should be monitored.`],
].map(([prompt, correct, explanation], index) => makeQuestion(spec, index, prompt, correct, explanation, spec.boundary));

window.MASTERY_CHAPTERS = chapterSpecs.map(({ id, title }) => ({ id, title }));
window.MASTERY_CHAPTER_QUESTIONS = chapterSpecs.flatMap(buildExam);
