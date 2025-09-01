import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/Product/ProductCard";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useUserProfile } from "@/hooks/useUserProfile";
import { assistantAPI } from "@/api/assistant.api";

type CategoryKey = "skin" | "hair" | "body";

type Question = {
  id: string;
  text: string;
  multi?: boolean;
  options: { value: string; label: string }[];
};

type Questionnaire = Record<CategoryKey, Question[]>;

const QUESTIONS: Questionnaire = {
  skin: [
    {
      id: "skinType",
      text: "What is your skin type?",
      options: [
        { value: "oily", label: "Oily" },
        { value: "dry", label: "Dry" },
        { value: "combination", label: "Combination" },
        { value: "normal", label: "Normal" },
        { value: "sensitive", label: "Sensitive" },
      ],
    },
    {
      id: "skinConcern",
      text: "Primary skin concern? (select multiple)",
      multi: true,
      options: [
        { value: "acne", label: "Acne / Breakouts" },
        { value: "pigmentation", label: "Pigmentation" },
        { value: "aging", label: "Fine lines / Aging" },
        { value: "dullness", label: "Dullness" },
        { value: "sensitivity", label: "Redness / Sensitivity" },
      ],
    },
  ],
  hair: [
    {
      id: "hairType",
      text: "What is your hair type?",
      options: [
        { value: "straight", label: "Straight" },
        { value: "wavy", label: "Wavy" },
        { value: "curly", label: "Curly" },
        { value: "coily", label: "Coily" },
      ],
    },
    {
      id: "hairConcern",
      text: "Primary hair concern? (select multiple)",
      multi: true,
      options: [
        { value: "frizz", label: "Frizz" },
        { value: "dandruff", label: "Dandruff" },
        { value: "hairfall", label: "Hair fall" },
        { value: "dryness", label: "Dryness" },
        { value: "oily", label: "Oily scalp" },
      ],
    },
  ],
  body: [
    {
      id: "bodyConcern",
      text: "Primary body skin concern? (select multiple)",
      multi: true,
      options: [
        { value: "dryness", label: "Dryness" },
        { value: "sensitive", label: "Sensitivity / Itch" },
        { value: "bodyacne", label: "Body acne" },
        { value: "pigmentation", label: "Pigmentation / Tan" },
      ],
    },
  ],
};

type Answers = Partial<Record<string, string | string[]>>;

const AssistantPage = () => {
  const [activeTab, setActiveTab] = useState<CategoryKey>("skin");
  const [answers, setAnswers] = useState<Record<CategoryKey, Answers>>({ skin: {}, hair: {}, body: {} });
  const [mode, setMode] = useState<"wizard" | "chat">("wizard");
  const [step, setStep] = useState(1);
  const totalSteps = 3; // Profile -> Questions -> Results
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; text: string }[]>([{
    role: "assistant",
    text: "Hi! Tell me your concerns (e.g., oily skin acne) or use the wizard.",
  }]);

  const { data: allProducts } = useProducts();
  const { preferences, updatePreferences } = useUserPreferences();
  const { profile, updateProfile } = useUserProfile();
  // Update preferences when mode/activeTab changes
  useEffect(() => {
    if (preferences?.assistant) {
      updatePreferences({
        assistant: {
          ...preferences.assistant,
          mode,
          activeTab,
        }
      });
    }
  }, [mode, activeTab, preferences, updatePreferences]);

  const selectedFilters = useMemo(() => {
    const filters: { category?: string; search?: string } = {};
    if (activeTab === "skin") {
      filters.category = "Skin";
    }
    if (activeTab === "hair") {
      filters.category = "Hair";
    }
    if (activeTab === "body") {
      filters.category = "Body";
    }
    return filters;
  }, [activeTab]);

  const recommended = useMemo(() => {
    const list = Array.isArray(allProducts) ? allProducts : [];
    return list.filter((p: any) => {
      const matchesCategory = selectedFilters.category ? (p?.category ?? "") === selectedFilters.category : true;
      return matchesCategory;
    }).slice(0, 9);
  }, [allProducts, selectedFilters]);

  const runLLMSuggestions = async () => {
    try {
      setLlmLoading(true);
      setLlmRecs(null);
      setLlmSource(null);
      setLlmTags(null);
      const resp = await assistantAPI.suggest({
        messages,
        filters: { category: selectedFilters.category, search: selectedFilters.search, profile },
      });
      if (Array.isArray(resp?.recommendations)) {
        setLlmRecs(resp.recommendations);
        setLlmSource(resp?.source ?? null);
        setLlmTags(Array.isArray(resp?.tags) ? resp.tags : null);
        setMessages((m) => [...m, { role: "assistant", text: "I found some tailored picks for you." }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: "No specific picks from AI; showing best matches." }]);
      }
    } finally {
      setLlmLoading(false);
    }
  };

  const onSelect = (cat: CategoryKey, qid: string, value: string) => {
    const q = (QUESTIONS[cat] || []).find((qq) => qq.id === qid);
    if (q?.multi) {
      setAnswers((prev) => {
        const prevCat = prev[cat] || {};
        const current = prevCat[qid];
        let nextArr: string[] = Array.isArray(current) ? [...(current as string[])] : [];
        if (nextArr.includes(value)) {
          nextArr = nextArr.filter((v) => v !== value);
        } else {
          nextArr.push(value);
        }
        // Persist array answers for multi-select questions
        updateProfile({ [qid]: nextArr } as any);
        return { ...prev, [cat]: { ...prevCat, [qid]: nextArr } };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [cat]: { ...(prev[cat] || {}), [qid]: value } }));
      updateProfile({ [qid]: value } as any);
    }
  };

  const reset = () => {
    updateProfile({
      age: undefined,
      climate: undefined,
      allergies: [],
      skinType: undefined,
      hairType: undefined,
      routine: undefined,
      budget: undefined,
      ingredientPreferences: { avoid: [], prefer: [] },
      notes: undefined,
    });
  };

  // Voice input (Web Speech API)
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmRecs, setLlmRecs] = useState<any[] | null>(null);
  const [llmSource, setLlmSource] = useState<string | null>(null);
  const [llmTags, setLlmTags] = useState<string[] | null>(null);

  const speak = (text: string) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      synth.cancel();
      synth.speak(utter);
    } catch {}
  };

  const startVoice = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript as string;
      handleUserMessage(transcript);
    };
    rec.onend = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  const stopVoice = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  const handleUserMessage = async (text: string) => {
    setMessages((m) => [...m, { role: "user", text }]);
    setLlmLoading(true);
    try {
      const resp = await assistantAPI.suggest({
        messages: [...messages, { role: "user", text }].map((m) => ({ role: m.role, content: m.text })),
        filters: { category: selectedFilters.category, search: selectedFilters.search, profile },
      });
      const reply = resp?.reply || "";
      if (reply) {
        setMessages((m) => [...m, { role: "assistant", text: reply }]);
        speak(reply);
      }
      if (Array.isArray(resp?.recommendations)) {
        setLlmRecs(resp.recommendations);
        setLlmSource(resp?.source ?? null);
        setLlmTags(Array.isArray(resp?.tags) ? resp.tags : null);
      }
    } catch (e) {
      const fallback = "There was an issue reaching AI. Please try again.";
      setMessages((m) => [...m, { role: "assistant", text: fallback }]);
      speak(fallback);
    } finally {
      setLlmLoading(false);
    }
  };

  const buildWizardPrompt = () => {
    const cat = activeTab;
    const a = answers[cat] || {};
    const entries = Object.entries(a).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
    const prof = profile || {};
    const prefer = prof?.ingredientPreferences?.prefer || [];
    const avoid = prof?.ingredientPreferences?.avoid || [];
    const allergies = prof?.allergies || [];
    const lines = [
      `Category: ${cat}`,
      `Age: ${prof?.age ?? ""}`,
      `Climate: ${prof?.climate ?? ""}`,
      `Routine: ${prof?.routine ?? ""}`,
      `Budget: ${prof?.budget ?? ""}`,
      `Allergies: ${allergies.join(", ")}`,
      `Prefer ingredients: ${prefer.join(", ")}`,
      `Avoid ingredients: ${avoid.join(", ")}`,
      `Answers: ${entries.join("; ")}`,
    ];
    return `Analyze these details and recommend the best matching products. Focus on safety with allergies, respect avoid list, and prefer the desired ingredients. Provide short, actionable advice and product picks.\n\n${lines.join("\n")}`;
  };

  const runWizardAnalysis = async () => {
    try {
      setStep(3);
      setLlmLoading(true);
      setLlmRecs(null);
      setLlmSource(null);
      setLlmTags(null);
      const prompt = buildWizardPrompt();
      const resp = await assistantAPI.suggest({
        messages: [{ role: "user", content: prompt }],
        filters: { category: selectedFilters.category, search: selectedFilters.search, profile },
      });
      const reply = resp?.reply || "";
      if (reply) {
        setMessages((m) => [...m, { role: "assistant", text: reply }]);
        // optional: speak(reply); // avoid auto-speech in wizard results
      }
      if (Array.isArray(resp?.recommendations)) {
        setLlmRecs(resp.recommendations);
        setLlmSource(resp?.source ?? null);
        setLlmTags(Array.isArray(resp?.tags) ? resp.tags : null);
      }
    } finally {
      setLlmLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-2">Personalized Assistant</h1>
        <p className="text-gray-600 mb-6">Choose a category to get a personalized questionnaire and product recommendations. You can also switch to Chat for free-form help with voice input and responses.</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Button variant={mode === "wizard" ? "default" : "outline"} onClick={() => setMode("wizard")}>Wizard</Button>
            <Button variant={mode === "chat" ? "default" : "outline"} onClick={() => setMode("chat")}>Chat</Button>
          </div>
          <div className="flex gap-2">
            <Button variant={listening ? "destructive" : "outline"} onClick={listening ? stopVoice : startVoice}>
              {listening ? "Stop Voice" : "Speak"}
            </Button>
            <Button onClick={runLLMSuggestions} disabled={llmLoading}>{llmLoading ? "Asking AI..." : "AI Suggest"}</Button>
          </div>
        </div>

        {mode === "wizard" && (
          <div>
            <Stepper current={step} labels={["Category", "Questions", "Results"]} />

            {step === 1 && (
              <div className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Choose a category to get personalized recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {([
                        { key: "skin", label: "Skin" },
                        { key: "hair", label: "Hair" },
                        { key: "body", label: "Body" },
                      ] as { key: CategoryKey; label: string }[]).map((c) => (
                        <CategoryCard
                          key={c.key}
                          active={activeTab === c.key}
                          label={c.label}
                          icon={c.key === "skin" ? "💆" : c.key === "hair" ? "💇" : "🧴"}
                          onClick={() => {
                            setActiveTab(c.key);
                            setStep(2);
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 2 && (
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <Label>Age</Label>
                        <input
                          type="number"
                          min={0}
                          max={120}
                          className="w-full border rounded px-3 py-2"
                          value={profile?.age ?? ""}
                          onChange={(e) => updateProfile({ ...profile, age: Number(e.target.value) || undefined })}
                        />
                      </div>
                      <div>
                        <Label>Climate</Label>
                        <Select
                          value={profile?.climate ?? ""}
                          onValueChange={(v: string) => updateProfile({ ...profile, climate: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select climate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="humid">Humid</SelectItem>
                            <SelectItem value="dry">Dry</SelectItem>
                            <SelectItem value="temperate">Temperate</SelectItem>
                            <SelectItem value="cold">Cold</SelectItem>
                            <SelectItem value="hot">Hot</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Routine</Label>
                        <Select
                          value={profile?.routine ?? ""}
                          onValueChange={(v: string) => updateProfile({ ...profile, routine: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select routine" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Budget</Label>
                        <Select
                          value={profile?.budget ?? ""}
                          onValueChange={(v: string) => updateProfile({ ...profile, budget: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Allergies (comma separated)</Label>
                        <input
                          className="w-full border rounded px-3 py-2"
                          value={(profile?.allergies ?? []).join(", ")}
                          onChange={(e) => updateProfile({ ...profile, allergies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                          placeholder="e.g., fragrance, salicylic acid"
                        />
                      </div>
                      <div className="sm:col-span-2 grid sm:grid-cols-2 gap-3">
                        <div>
                          <Label>Prefer Ingredients (comma separated)</Label>
                          <input
                            className="w-full border rounded px-3 py-2"
                            value={(profile?.ingredientPreferences?.prefer ?? []).join(", ")}
                            onChange={(e) => updateProfile({
                              ...profile,
                              ingredientPreferences: {
                                avoid: profile?.ingredientPreferences?.avoid ?? [],
                                prefer: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              }
                            })}
                            placeholder="e.g., niacinamide, hyaluronic acid"
                          />
                        </div>
                        <div>
                          <Label>Avoid Ingredients (comma separated)</Label>
                          <input
                            className="w-full border rounded px-3 py-2"
                            value={(profile?.ingredientPreferences?.avoid ?? []).join(", ")}
                            onChange={(e) => updateProfile({
                              ...profile,
                              ingredientPreferences: {
                                prefer: profile?.ingredientPreferences?.prefer ?? [],
                                avoid: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              }
                            })}
                            placeholder="e.g., fragrance, alcohol"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {QUESTIONS[activeTab].map((q) => {
                    const current = (answers[activeTab] ?? {})[q.id] ?? (profile as any)?.[q.id] ?? (q.multi ? [] : "");
                    return (
                      <Card key={q.id}>
                        <CardHeader>
                          <CardTitle className="text-base">{q.text}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label>Select {q.multi ? "one or more" : "one"}</Label>
                            <div className="flex flex-wrap gap-2">
                              {q.options.map((opt) => {
                                const selected = Array.isArray(current)
                                  ? current.includes(opt.value)
                                  : current === opt.value;
                                return (
                                  <Button
                                    key={opt.value}
                                    variant={selected ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => onSelect(activeTab, q.id, opt.value)}
                                  >
                                    {opt.label}
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Your selections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {QUESTIONS[activeTab].map((q) => {
                          const val = (answers[activeTab] ?? {})[q.id] ?? (profile as any)?.[q.id];
                          const vals = Array.isArray(val) ? val : val ? [val] : [];
                          return vals.map((v: string) => (
                            <span key={`${q.id}-${v}`} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
                              {(q.options.find((o) => o.value === v)?.label) || v}
                            </span>
                          ));
                        })}
                        {QUESTIONS[activeTab].every((q) => {
                          const val = (answers[activeTab] ?? {})[q.id] ?? (profile as any)?.[q.id];
                          return !val || (Array.isArray(val) && val.length === 0);
                        }) && (
                          <span className="text-xs text-gray-500">No selections yet.</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3 items-center">
                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="outline" onClick={reset}>Reset</Button>
                    <Button onClick={runWizardAnalysis} disabled={llmLoading}>
                      {llmLoading ? "Analyzing..." : "Finish & Analyze"}
                    </Button>
                    <span className="text-xs text-gray-500">Step {step} of {totalSteps}</span>
                  </div>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Preview recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {llmLoading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonTile key={i} />
                          ))}
                        </div>
                      ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {recommended.slice(0, 9).map((p: any) => (
                            <ProductCard key={p._id} product={p} />
                          ))}
                          {recommended.length === 0 && (
                            <p className="text-sm text-gray-500">Select options to see relevant products.</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Your personalized recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      {llmSource && (
                        <span className="text-xs text-blue-700">Source: {llmSource.toUpperCase()} {llmTags && llmTags.length > 0 ? `(tags: ${llmTags.join(", ")})` : ""}</span>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setStep(2)}>Edit answers</Button>
                        <Button onClick={runWizardAnalysis} disabled={llmLoading}>{llmLoading ? "Re-analyzing..." : "Re-run AI"}</Button>
                      </div>
                    </div>
                    {llmLoading ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <SkeletonTile key={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(llmRecs ?? recommended).slice(0, 9).map((p: any) => (
                          <ProductCard key={p._id} product={p} />
                        ))}
                        {(!llmRecs || llmRecs.length === 0) && recommended.length === 0 && (
                          <p className="text-sm text-gray-500">No recommendations available. Try adjusting your answers.</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {mode === "chat" && (
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col h-[480px] border rounded-lg">
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <MessageBubble key={i} role={m.role} text={m.text} />
                ))}
                {llmLoading && <TypingIndicator />}
              </div>
              <ChatInput onSend={handleUserMessage} listening={listening} onToggleVoice={() => (listening ? stopVoice() : startVoice())} />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommended for you</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    {llmSource && (
                      <span className="text-xs text-blue-700">Source: {llmSource.toUpperCase()} {llmTags && llmTags.length > 0 ? `(tags: ${llmTags.join(", ")})` : ""}</span>
                    )}
                  </div>
                  {llmLoading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonTile key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommended.slice(0, 9).map((p: any) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                      {recommended.length === 0 && (
                        <p className="text-sm text-gray-500">Describe your concern to see recommendations.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const ChatInput = ({ onSend, listening, onToggleVoice }: { onSend: (text: string) => void; listening: boolean; onToggleVoice: () => void }) => {
  const [val, setVal] = useState("");
  const submit = () => {
    const text = val.trim();
    if (!text) return;
    onSend(text);
    setVal("");
  };
  const quick = [
    "Recommend a simple routine",
    "Help with acne and oily skin",
    "Products for dry, sensitive skin",
  ];
  return (
    <div className="p-3 border-t space-y-2">
      <div className="flex flex-wrap gap-2">
        {quick.map((q) => (
          <Button key={q} size="sm" variant="secondary" onClick={() => onSend(q)}>
            {q}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your concern or use quick prompts..."
        />
        <Button variant={listening ? "destructive" : "outline"} onClick={onToggleVoice}>
          {listening && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2 inline-block" />}
          {listening ? "Stop" : "Speak"}
        </Button>
        <Button onClick={submit}>Send</Button>
      </div>
    </div>
  );
};

// UI helpers
const Stepper = ({ current, labels }: { current: number; labels: string[] }) => {
  return (
    <div className="flex items-center gap-4 mt-2 mb-3">
      {labels.map((label, idx) => {
        const stepNum = idx + 1;
        const active = stepNum <= current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
              {stepNum}
            </div>
            <span className={`text-sm ${active ? "text-blue-700" : "text-gray-500"}`}>{label}</span>
            {idx < labels.length - 1 && (
              <div className={`w-12 h-[2px] mx-2 ${stepNum < current ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const MessageBubble = ({ role, text }: { role: "assistant" | "user"; text: string }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
        {text}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-gray-100 text-gray-500 rounded-2xl px-3 py-2 text-xs animate-pulse">AI is typing…</div>
  </div>
);

const CategoryCard = ({ active, label, icon, onClick }: { active: boolean; label: string; icon: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`border rounded-xl p-5 text-left transition ring-offset-2 focus:outline-none ${active ? "border-blue-600 ring-2 ring-blue-600" : "border-gray-200 hover:border-gray-300"}`}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="font-medium">{label}</div>
    <div className="text-xs text-gray-500 mt-1">Get tailored questions for {label.toLowerCase()}.</div>
  </button>
);

const SkeletonTile = () => (
  <div className="border rounded-lg p-3 animate-pulse">
    <div className="h-24 bg-gray-200 rounded mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export default AssistantPage;


