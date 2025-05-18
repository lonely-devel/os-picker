"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";

const FACTORS = [
  {
    id: "openness",
    label: "Я ценю открытость и возможность кастомизации",
    osMap: { android: 1, ios: -1 },
  },
  {
    id: "ecosystem",
    label: "Я ценю цельную экосистему и бесшовную интеграцию",
    osMap: { android: -1, ios: 1 },
  },
  {
    id: "price",
    label: "Я ограничен в бюджете и ищу доступное устройство",
    osMap: { android: 1, ios: -1 },
  },
  {
    id: "security",
    label: "Я придаю большое значение безопасности и своевременным обновлениям",
    osMap: { android: -1, ios: 1 },
  },
  {
    id: "status",
    label: "Я обращаю внимание на имиджевый статус устройства",
    osMap: { android: -1, ios: 1 },
  },
];

export default function Page() {
  // начальное значение каждого слайдера — 3 (нейтральная важность)
  const [values, setValues] = useState(
      Object.fromEntries(FACTORS.map((f) => [f.id, 3]))
  );

  const [checked, setChecked] = useState(false)

  const handleChange = (id, valArr) => {
    setValues({ ...values, [id]: valArr[0] });
  };

  const onChange = (checked) => {
      setChecked(checked)
  }

  // Подсчёт очков: суммируем (важность * коэффициент фактора)
  const scores = FACTORS.reduce(
      (acc, f) => {
        acc.android += f.osMap.android * values[f.id];
        acc.ios += f.osMap.ios * values[f.id];
        return acc;
      },
      { android: 0, ios: 0 }
  );

  let recommendation = "Попробуйте обе системы!";
  if (scores.android > scores.ios) recommendation = "Вам ближе Android";
  else if (scores.ios > scores.android) recommendation = "Вам ближе iOS";

  if(checked) recommendation = "Вам ближе Redmi 9C"

  return (
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Подбор мобильной операционной системы
        </h1>

        {FACTORS.map((f) => (
            <Card key={f.id} className="border border-muted shadow-sm">
              <CardContent className="space-y-3 py-4">
                <p className="font-medium leading-tight">{f.label}</p>
                <Slider
                    defaultValue={[values[f.id]]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(v) => handleChange(f.id, v)}
                />
                <p className="text-sm text-muted-foreground">Важность: {values[f.id]}</p>
              </CardContent>
            </Card>
        ))}

          <Card className="border border-muted shadow-sm">
              <CardContent className="space-y-3 py-4">
                  <div className="flex items-center space-x-2">
                      <Switch id="call" onCheckedChange={onChange} checked={checked}/>
                      <Label htmlFor="call">Надо чтоб звонило и всё</Label>
                  </div>

                      <p className="text-sm text-muted-foreground">Важность: критичная</p>
              </CardContent>
          </Card>

          <motion.div
              key={recommendation}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xl font-semibold mt-4"
        >
          {recommendation}
        </motion.div>
      </div>
  );
}
