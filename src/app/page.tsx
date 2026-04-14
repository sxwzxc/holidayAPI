import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatDateCN,
  getDayStatus,
  getMonthHolidays,
  toDateString,
} from "@/lib/holiday";

export const dynamic = "force-dynamic";

export default function Home() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const todayInfo = getDayStatus(today);
  const monthHolidays = getMonthHolidays(currentYear, currentMonth);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">中国节假日查询</h1>
        <p className="mt-3 text-slate-300">
          数据来源于 <code className="rounded bg-slate-800 px-1.5 py-0.5">config/holidayAPI.json</code>，按规则自动判断今天状态与当月假期。
        </p>
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card className="border-slate-700 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl">今日状态</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">日期：{toDateString(today)}</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-400">{todayInfo.status}</p>
            <p className="mt-2 text-sm text-slate-300">原因：{todayInfo.reason}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-700 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl">API 快速入口</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">访问路径：</p>
            <a
              className="mt-2 inline-block rounded bg-slate-800 px-3 py-1.5 font-mono text-sky-300 hover:bg-slate-700"
              href="/today"
            >
              /today
            </a>
            <p className="mt-2 text-sm text-slate-300">返回纯文本：放假 / 上班</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <Card className="border-slate-700 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl">iPhone 快捷指令</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-4">节假日自动跳过闹钟的 iOS 快捷指令</p>
            <a
              href="https://www.icloud.com/shortcuts/29a96f16c669472e9ec3c994cf645086"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              添加快捷指令
            </a>
            
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">使用步骤：</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>点击上方按钮添加快捷指令到快捷指令 App</li>
                <li className="font-semibold text-amber-300">首次添加后，请点击快捷指令进行一次手动运行</li>
                <li>打开「快捷指令」应用 → 切换到「自动化」标签</li>
                <li>创建新自动化 → 选择「时间」→ 设置每天凌晨 00:05 运行</li>
                <li>选择上面添加的快捷指令 → 关闭「运行前询问」→ 完成</li>
              </ol>
              <p className="mt-4 text-slate-400 text-xs">
                💡 快捷指令会自动判断今天是否放假，是放假则禁用所有闹钟，否则启用闹钟。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-700 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentYear} 年 {currentMonth} 月节假日安排
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthHolidays.length === 0 ? (
              <p className="text-slate-300">本月没有法定节假日安排。</p>
            ) : (
              <div className="space-y-4">
                {monthHolidays.map((holiday) => (
                  <article
                    key={`${holiday.Name}-${holiday.StartDate}-${holiday.EndDate}`}
                    className="rounded-lg border border-slate-700 bg-slate-950 p-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-100">{holiday.Name}</h3>
                    <p className="mt-2 text-sm text-slate-300">
                      放假时间：{formatDateCN(holiday.StartDate)} - {formatDateCN(holiday.EndDate)}（共 {holiday.Duration} 天）
                    </p>
                    <p className="mt-2 text-sm text-slate-300">说明：{holiday.Memo}</p>
                    {holiday.CompDays.length > 0 && (
                      <p className="mt-2 text-sm text-amber-300">
                        调休上班：{holiday.CompDays.map((date) => formatDateCN(date)).join("、")}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
