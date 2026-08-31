(() => {
  const courses = [
    { id: '01', title: 'Generative AI Ecosystem', topic: 'Foundations', concepts: [
      ['LLMs predict likely next tokens from context.', 'LLMs do not hold human-like understanding or guaranteed truth.', 'Treat fluent output as a draft that still needs verification.'],
      ['Multimodality combines information such as text, images, audio, and video.', 'Multimodality is not simply doing several unrelated tasks.', 'Match the model’s modalities to the data the task actually requires.'],
      ['Conversational text systems can summarize, transform, and explain documents.', 'A text model is not automatically a trusted source of current private information.', 'Provide approved source material and request a bounded first draft.'],
      ['Synthetic and image-generation systems create new media from prompts.', 'Generated media is not evidence that an event or product exists.', 'Review brand, factual, and licensing requirements before use.'],
      ['AI tools should be selected by business capability and use case.', 'Popularity alone is not a tool-selection strategy.', 'Map drafting, analysis, coding, and media needs to suitable tools.'],
    ] },
    { id: '02', title: 'AI Architect’s Toolkit', topic: 'RAG & Models', concepts: [
      ['Cloud APIs provide rapid access to powerful models and elastic scale.', 'Cloud APIs do not eliminate data, network, or usage-cost considerations.', 'Use approved providers with controls that match the workload.'],
      ['Local deployment maximizes control, data residency, and offline operation.', 'Local deployment does not remove hardware, operations, or scaling work.', 'Budget for infrastructure, monitoring, and model operations.'],
      ['Subscriptions suit predictable, steady per-user usage.', 'A subscription is not automatically efficient for low or sporadic usage.', 'Use subscriptions for stable high-volume teams.'],
      ['Token pricing charges for both input/context and generated output.', 'Usage-based pricing is not inherently predictable without controls.', 'Set alerts, caps, and efficient model-routing rules.'],
      ['Enterprise evaluation includes contractual Zero Data Retention and SOC 2 controls.', 'Benchmark scores and a free tier do not prove sensitive-data protection.', 'Verify contractual terms and compliance evidence before data is shared.'],
    ] },
    { id: '03', title: 'Prompt Engineering for Technical Precision', topic: 'Prompting', concepts: [
      ['Treat AI as a capable but literal junior analyst that lacks business context.', 'A one-word request is not a complete brief.', 'Provide context, goals, audience, tone, constraints, and desired output.'],
      ['Specificity turns broad information into useful technical guidance.', 'A technically accurate wall of text is not necessarily understandable.', 'Ask for an analogy and a structured technical artifact when appropriate.'],
      ['A role/persona establishes the expert lens and vocabulary for a task.', 'A persona does not replace the actual expert’s review.', 'Specify a relevant role such as a senior database administrator.'],
      ['Output requirements act as a contract for format and structure.', 'JSON, YAML, or a table does not guarantee factual accuracy.', 'State the exact format, schema, and acceptance conditions.'],
      ['Iterative follow-ups refine a first draft efficiently.', 'The first response is not expected to be a finished production deliverable.', 'Request targeted changes such as refactoring, comments, or tighter constraints.'],
    ] },
    { id: '04', title: 'Generative AI Security and Privacy Fundamentals', topic: 'Security & Governance', concepts: [
      ['Historical training data can encode and amplify past human bias.', 'Automation does not make a biased process objective.', 'Audit outcomes, examine data, and keep human oversight in consequential decisions.'],
      ['Direct prompt injection explicitly tries to override the assistant’s instructions.', 'A user instruction is not automatically authorized just because it is recent.', 'Keep persistent guardrails in system-level controls.'],
      ['Indirect prompt injection hides instructions in content such as PDFs, web pages, or emails.', 'Retrieved content is evidence, not trusted instruction.', 'Treat external content as untrusted and limit downstream action.'],
      ['Human approval is essential before AI sends, spends, publishes, or changes records.', 'A polished recommendation is not authorization for an irreversible action.', 'Use escalation and approval gates for high-impact work.'],
      ['Privacy governance gives people meaningful control over their personal information.', 'Removing a name alone does not make sensitive data safe for public tools.', 'Use approved enterprise services with explicit protections.'],
    ] },
    { id: '05', title: 'Optimizing Generative AI', topic: 'Verification & Analysis', concepts: [
      ['Primary sources are required for high-stakes claims such as quarterly revenue.', 'A confident news citation is not sufficient proof for a financial report.', 'Confirm material facts with filings, earnings releases, or equivalent primary evidence.'],
      ['CROSS structures a prompt with Role, Context, Scope, Source, and Objective.', 'A long prompt without the right components can still be ambiguous.', 'Use CROSS to make the brief complete and testable.'],
      ['Deconstructing separates a complex task into smaller sequential stages.', 'A single giant instruction often produces shallow reasoning.', 'Create a chain such as research, validate, synthesize, and decide.'],
      ['Validation prevents errors from cascading through a multi-step prompt chain.', 'Synthesis cannot repair fabricated evidence upstream.', 'Check research outputs before using them in later reasoning.'],
      ['Diverge, Deepen, Decide moves from ideas to evaluation to a transparent choice.', 'A decision matrix is not a creativity exercise.', 'Compare promising options against explicit criteria before deciding.'],
    ] },
    { id: '06', title: 'Debugging and Correcting AI-Generated Outputs', topic: 'Verification & Analysis', concepts: [
      ['A confident impostor is fluent but inaccurate or fabricated AI output.', 'Professional tone is not evidence of correctness.', 'Verify evidence, citations, freshness, and technical claims before use.'],
      ['The Verification Pyramid uses more rigorous checks for higher-stakes information.', 'An internal gut check is not enough for a material business claim.', 'Escalate critical facts to primary-source confirmation.'],
      ['Human refinement checks tone, nuance, strategic fit, accuracy, and security.', 'Manual editing is not merely a legal formality or spelling exercise.', 'Treat AI output as a first draft under accountable expert review.'],
      ['Stepwise analysis helps keep evidence visible in a complicated diagnosis.', 'Formatting alone does not improve reasoning quality.', 'Ask for evidence, intermediate checks, and a justified conclusion.'],
      ['System prompts establish persistent behavior constraints.', 'User examples do not reliably override an unsafe system behavior.', 'Put non-negotiable guardrails such as “never hardcode secrets” in the system prompt.'],
    ] },
    { id: '07', title: 'Advanced Generative AI Skills', topic: 'RAG & Models', concepts: [
      ['RAG grounds answers in retrieved, current organizational documents.', 'RAG does not change the base model’s fundamental reasoning ability.', 'Re-index approved sources when policies change.'],
      ['Fine-tuning suits stable recurring behavior, style, or formats.', 'Fine-tuning is usually a poor way to keep fast-changing policies current.', 'Choose RAG for mutable knowledge and fine-tuning for stable specialization.'],
      ['Model drift happens when reality changes while the deployed model stays static.', 'Unchanged code and hardware do not guarantee sustained accuracy.', 'Monitor production performance and plan evaluation and retraining cycles.'],
      ['Quantization reduces model memory requirements through lower precision.', 'More CPU RAM does not replace the GPU VRAM needed for a model’s active weights.', 'Use an appropriate precision such as INT8 after evaluating quality trade-offs.'],
      ['Open-source model cards include licensing obligations.', 'High download counts do not establish commercial-use rights.', 'Review the license before use, redistribution, or modification.'],
    ] },
    { id: '08', title: 'AI-Driven Software Engineering', topic: 'Software Engineering', concepts: [
      ['AI can help throughout the SDLC, from planning through maintenance.', 'AI is not only a code-completion tool.', 'Use it where it reduces a real bottleneck and retain engineering accountability.'],
      ['Conversational AI can scaffold coordinated multi-file first drafts from a design.', 'Generated files are not ready to merge without review.', 'Validate architecture, dependencies, tests, and security before integration.'],
      ['AI can generate CI/CD configurations and deployment scripts.', 'Automation does not remove the need to secure and test the delivery pipeline.', 'Review infrastructure-as-code and apply least privilege.'],
      ['Production AI-generated code needs security verification.', 'Naming conventions and comments are not the most critical production check.', 'Review secrets, authorization, input handling, dependencies, and vulnerabilities.'],
      ['Hard-coded API keys create a credential-exposure risk.', 'A key leak is not merely a future rotation inconvenience.', 'Use secret managers, environment configuration, revocation, and rotation.'],
    ] },
    { id: '09', title: 'AI for Data Engineering and Exploration', topic: 'Verification & Analysis', concepts: [
      ['The Orient step establishes a high-level thematic understanding of feedback.', 'Starting with one favorite quote does not reveal the overall landscape.', 'Ask for the main themes, issues, and vocabulary across the corpus.'],
      ['Correlation connects themes across sources and customer segments.', 'A correlation does not establish a causal mechanism.', 'Compare tickets, reviews, tiers, and time periods to find relationships.'],
      ['AI translates business questions into analysis of unstructured feedback.', 'A thematic summary is not an automatic strategic decision.', 'Use iterative follow-up questions to deepen the insight.'],
      ['Trust but verify requires reviewing source samples behind an AI insight.', 'A surprising insight should not be immediately presented as fact.', 'Inspect representative records and validate the interpretation.'],
      ['A useful hypothesis states a product-focused, testable explanation.', 'Calling a customer segment “demanding” is not an actionable hypothesis.', 'Translate the pattern into a testable statement about the product or experience.'],
    ] },
    { id: '10', title: 'Customizing AI Models', topic: 'RAG & Models', concepts: [
      ['A custom model creates an ongoing operational responsibility after launch.', 'A successful proof of concept is not a complete enterprise solution.', 'Plan ownership across monitoring, data, deployment, and operations.'],
      ['Retraining requires validated, versioned production data pipelines.', 'Model retraining cannot be reliable if the data pipeline is fragile.', 'Validate schemas, lineage, quality, and versioning.'],
      ['Day 2 operations require monitoring, alerting, rollback, and safe evaluation.', 'A launch metric does not ensure future production health.', 'Instrument accuracy, latency, cost, and safety signals.'],
      ['A/B testing helps validate new models before broad rollout.', 'Replacing a live model everywhere at once creates avoidable operational risk.', 'Use controlled comparison and rollback capability.'],
      ['Total cost compounds through engineering effort and repeated retraining cycles.', 'Model training cost alone is not the full five-year cost.', 'Budget for people, infrastructure, data, monitoring, and incident response.'],
    ] },
    { id: '11', title: 'AI-Powered Workflows and Agentic AI', topic: 'Workflows & Agents', concepts: [
      ['A glass-box workflow makes steps, tools, approvals, and outcomes visible.', 'A black-box final answer is not enough for accountable business decisions.', 'Log each stage and make the audit trail reviewable.'],
      ['A basic agent loops through observe, think, act, and evaluate.', 'An agent is not magic or unrestricted autonomy.', 'Define a goal, bounded tools, and stopping conditions.'],
      ['Directive workflows suit deterministic processes with known paths.', 'An autonomous agent is not automatically better for a decision tree.', 'Reserve agentic reasoning for ambiguous or novel cases.'],
      ['n8n can be self-hosted for data residency and infrastructure control.', 'Self-hosting does not eliminate the need for credentials and governance.', 'Place triggers, processing, and outputs within approved boundaries.'],
      ['Model Context Protocol standardizes model-to-tool integration.', 'MCP does not itself replace authorization, encryption, or tool security.', 'Use standard interfaces while preserving least privilege and auditability.'],
    ] },
    { id: '12', title: 'AITECH Prompting Tutorial', topic: 'Prompting', concepts: [
      ['A complete prompt supplies enough context to guide a useful response.', 'Generic instructions invite generic answers.', 'State the user, goal, constraints, source material, and intended deliverable.'],
      ['Scope defines boundaries such as depth, exclusions, and assumptions.', 'A role alone does not define the work to be done.', 'Specify what the response must and must not cover.'],
      ['Source material grounds the model in supplied evidence.', 'A request for citations does not make an ungrounded answer factual.', 'Provide and name the approved sources to use.'],
      ['Objective explains the desired outcome and decision purpose.', 'A requested format does not reveal why the answer is needed.', 'Connect the output to the stakeholder’s task or decision.'],
      ['Prompting is an iterative conversation, not a vending-machine transaction.', 'Discarding every first draft wastes the context already established.', 'Use targeted follow-ups to correct gaps and improve the deliverable.'],
    ] },
    { id: '13', title: 'AI Agent Security and Defense', topic: 'Security & Governance', concepts: [
      ['Agent security must defend the entire observe-think-act loop.', 'Securing the initial prompt alone does not protect connected tools.', 'Apply controls to inputs, model behavior, tools, outputs, and logs.'],
      ['Prompt injection can manipulate an agent through direct or indirect instructions.', 'Tool access should not be granted simply because the model requested it.', 'Separate data from instruction and require authorization at the tool boundary.'],
      ['Least privilege limits an agent’s blast radius.', 'A single administrator token is not a safe default agent capability.', 'Use scoped, short-lived permissions and separate read from write actions.'],
      ['Approvals and stop conditions prevent unsafe autonomy.', 'A retry loop is not a substitute for a safe escalation policy.', 'Pause high-impact or uncertain operations for human review.'],
      ['Traces and logs support detection, forensics, and continuous defense.', 'Logging only a final answer cannot explain harmful tool behavior.', 'Record tool calls, permissions, inputs/outputs as appropriate, and decisions.'],
    ] },
  ];

  const prompts = [
    (name) => `Which statement best captures ${name}?`,
    (name) => `What is the most important distinction to remember about ${name}?`,
    (name) => `A team is using ${name}. What is the best next action?`,
    (name) => `Which risk most directly follows from misunderstanding ${name}?`,
    (name) => `How should an expert validate responsible use of ${name}?`,
  ];

  const questions = courses.flatMap((course) => course.concepts.flatMap(([concept, misconception, action], conceptIndex) => [
    { id: `${course.id}-${conceptIndex + 1}-a`, topic: course.topic, difficulty: 2, chapterId: course.id, mode: 'chapter', prompt: prompts[0](concept), choices: [misconception, concept, 'It is only relevant to model training', 'It removes the need for human judgment'], correctIndex: 1, explanation: concept, contrast: misconception },
    { id: `${course.id}-${conceptIndex + 1}-b`, topic: course.topic, difficulty: 2, chapterId: course.id, mode: 'chapter', prompt: prompts[1](concept), choices: [action, misconception, 'It always guarantees accurate output', 'It only affects visual AI systems'], correctIndex: 0, explanation: action, contrast: misconception },
    { id: `${course.id}-${conceptIndex + 1}-c`, topic: course.topic, difficulty: 3, chapterId: course.id, mode: 'chapter', prompt: prompts[2](concept), choices: ['Ignore the distinction and maximize automation', action, 'Treat a fluent answer as evidence', 'Use an unrestricted public service by default'], correctIndex: 1, explanation: action, contrast: misconception },
    { id: `${course.id}-${conceptIndex + 1}-d`, topic: course.topic, difficulty: 2, chapterId: course.id, mode: 'chapter', prompt: prompts[3](concept), choices: ['Better formatting', misconception, 'Reduced need for governance', 'Perfect future prediction'], correctIndex: 1, explanation: misconception, contrast: `The sound practice is: ${action}` },
    { id: `${course.id}-${conceptIndex + 1}-e`, topic: course.topic, difficulty: 3, chapterId: course.id, mode: 'chapter', prompt: prompts[4](concept), choices: [action, 'Accept it whenever the output sounds confident', 'Replace all specialist review with the model', 'Measure only the length of the answer'], correctIndex: 0, explanation: action, contrast: misconception },
  ]));

  window.AITECH_COURSES = courses.map(({ id, title }) => ({ id, title }));
  window.AITECH_CHAPTER_QUESTIONS = questions;
  window.MASTERY_CHAPTERS = window.MASTERY_CHAPTERS || window.AITECH_COURSES;
  window.MASTERY_CHAPTER_QUESTIONS = window.MASTERY_CHAPTER_QUESTIONS || window.AITECH_CHAPTER_QUESTIONS;
})();
