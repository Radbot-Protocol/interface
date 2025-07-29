import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { join } from "path";

interface PerformanceData {
  month: string;
  value: number;
}

interface UserData {
  name: string;
  currentValue: number;
  profitPercentage: number;
  profitLoss: number;
  referralEarnings: number;
  totalReferrals: number;
  totalShares: number;
  performanceData: PerformanceData[];
}

export async function POST(request: NextRequest) {
  try {
    const userData: UserData = await request.json();

    // Read and convert logo to base64
    const logoPath = join(process.cwd(), "public", "logo.png");
    const logoBuffer = readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString("base64");
    const logoDataUrl = `data:image/png;base64,${logoBase64}`;

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set viewport for consistent sizing
    await page.setViewport({ width: 800, height: 600 });

    // Create HTML content for the dashboard
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>RADBOT Dashboard</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body class="bg-black">
          <div class="w-[800px] h-[600px] bg-black p-8 relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500 rounded-full blur-3xl"></div>
              <div class="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-2xl"></div>
            </div>

            <!-- Header -->
            <div class="relative z-10 flex items-center justify-between mb-10">
              <div class="flex items-center gap-6">
                <div class="w-16 h-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <img src="${logoDataUrl}" alt="RADBOT" class="w-12 h-12 object-contain" style="filter: invert(1);" />
                </div>
                <div>
                  <h1 class="text-3xl font-bold text-white mb-1">${
                    userData.name
                  }</h1>
                  <p class="text-gray-400 text-lg">RADBOT Portfolio Dashboard</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-400 mb-1">Generated on</p>
                <p class="text-white font-semibold text-lg">${new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <!-- Main Stats -->
            <div class="grid grid-cols-2 gap-8 mb-10">
              <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <p class="text-gray-400 text-sm font-medium">Portfolio Value</p>
                    <div class="p-2 bg-green-500/20 rounded-lg">
                      <svg class="text-green-400 text-lg w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-3xl font-bold text-white mb-2">$${userData.currentValue.toLocaleString()}</p>
                  <div class="flex items-center gap-2">
                    <svg class="text-green-400 text-sm w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    <p class="text-green-400 text-sm font-semibold">+${
                      userData.profitPercentage
                    }% total return</p>
                  </div>
                </div>
              </div>

              <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-20 h-20 bg-fuchsia-500/20 rounded-full blur-xl"></div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <p class="text-gray-400 text-sm font-medium">sRADB Shares</p>
                    <div class="p-2 bg-fuchsia-500/20 rounded-lg">
                      <svg class="text-fuchsia-400 text-lg w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-3xl font-bold text-white mb-2">${userData.totalShares.toLocaleString()}</p>
                  <div class="flex items-center gap-2">
                    <svg class="text-fuchsia-400 text-sm w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <p class="text-fuchsia-400 text-sm font-semibold">+2.5% this week</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Performance Chart -->
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-10 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-bold text-white">Portfolio Performance</h3>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                    <span class="text-gray-400 text-sm font-medium">6 Month Growth</span>
                  </div>
                </div>
                <div class="h-32 flex items-end justify-between gap-2">
                  ${userData.performanceData
                    .map(
                      (data: PerformanceData) => `
                    <div class="flex-1 flex flex-col items-center">
                      <div class="w-full bg-gradient-to-t from-fuchsia-500/80 via-fuchsia-500/40 to-fuchsia-500/20 rounded-t-lg" style="height: ${
                        (data.value / 20000) * 100
                      }%; min-height: 12px;"></div>
                      <span class="text-xs text-gray-400 mt-3 font-medium">${
                        data.month
                      }</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            </div>

            <!-- Bottom Stats -->
            <div class="grid grid-cols-3 gap-6">
              <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="text-green-400 text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <p class="text-gray-400 text-sm mb-2 font-medium">Total Profit</p>
                <p class="text-2xl font-bold text-green-400">$${userData.profitLoss.toLocaleString()}</p>
              </div>
              <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="text-purple-400 text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20,12 20,22 4,22 4,12"></polyline>
                    <rect x="2" y="7" width="20" height="5"></rect>
                    <line x1="12" y1="22" x2="12" y2="7"></line>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                  </svg>
                </div>
                <p class="text-gray-400 text-sm mb-2 font-medium">Referral Earnings</p>
                <p class="text-2xl font-bold text-purple-400">$${userData.referralEarnings.toLocaleString()}</p>
              </div>
              <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="text-blue-400 text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <p class="text-gray-400 text-sm mb-2 font-medium">Total Referrals</p>
                <p class="text-2xl font-bold text-blue-400">${
                  userData.totalReferrals
                }</p>
              </div>
            </div>

            <!-- RADBOT Logo -->
            <div class="absolute bottom-6 right-6">
              <div class="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                <img src="${logoDataUrl}" alt="RADBOT" class="w-8 h-8 object-contain" style="filter: invert(1);" />
                <span class="text-white font-bold text-lg">RADBOT</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Capture screenshot
    const screenshot = await page.screenshot({
      type: "png",
      fullPage: false,
      omitBackground: false,
    });

    await browser.close();

    // Return the image as a response
    return new NextResponse(screenshot, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="radbot-dashboard-${userData.name
          .replace(/\s+/g, "-")
          .toLowerCase()}.png"`,
      },
    });
  } catch (error) {
    console.error("Error generating dashboard image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
