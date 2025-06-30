const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

// CONFIG
const ICOMOON_ZIP = 'icomoon.zip'
const ICOMOON_DIR = 'icomoon'
const ASSETS_DIR = 'assets'
const PUBLIC_FONTS_DIR = 'public/fonts'
const SASS_DIR = 'assets/sass'
const ICOMOON_URL = 'https://icomoon.io/app/#/select'
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  underline: '\x1b[4m',
}

// Helper to open URL in default browser (cross-platform)
function openUrl(url) {
  const start =
    process.platform == 'darwin'
      ? 'open'
      : process.platform == 'win32'
      ? 'start'
      : 'xdg-open'
  execSync(`${start} "${url}"`)
}

// Print instructions and wait for user confirmation
function promptUser(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question(question, answer => {
      rl.close()
      resolve(answer)
    })
  })
}

async function main() {
  console.log(
    `\n${colors.bold}${colors.cyan}Welcome to the IcoMoon asset updater!${colors.reset}\n`
  )

  console.log(
    `${colors.white}This tool will help you update your icon font assets.\n${colors.reset}` +
      `${colors.yellow}1.${colors.reset} You can open the IcoMoon app to edit or generate your icon font.\n` +
      `${colors.yellow}2.${colors.reset} Download the generated zip as ${
        colors.bold
      }${colors.green}"${ICOMOON_ZIP}"${colors.reset} to your project root (${
        colors.underline
      }${process.cwd()}${colors.reset}).\n` +
      `${colors.yellow}3.${colors.reset} The script will then extract and update your assets.\n`
  )

  console.log(
    `${colors.white}Type ${colors.bold}${colors.green}'open'${colors.reset}${colors.white} to launch IcoMoon in your browser, or ${colors.bold}${colors.green}'skip'${colors.reset}${colors.white} if you've already downloaded the zip.\n${colors.reset}`
  )

  const action = (
    await promptUser(`${colors.bold}Command (open/skip): ${colors.reset}`)
  )
    .trim()
    .toLowerCase()
  if (action === 'open') {
    console.log(`${colors.cyan}Opening IcoMoon site...${colors.reset}`)
    openUrl(ICOMOON_URL)
    console.log(
      `\n${colors.white}Please upload or edit your font package, generate the font, and download the zip file as ${colors.bold}${colors.green}"${ICOMOON_ZIP}"${colors.reset}${colors.white} to your project root.${colors.reset}`
    )
  } else {
    console.log(`${colors.gray}Skipping browser launch.${colors.reset}`)
  }

  await promptUser(
    `\n${colors.yellow}When you have downloaded and placed the zip file, press ${colors.bold}${colors.green}Enter${colors.reset}${colors.yellow} to continue...${colors.reset}`
  )

  // 1. Unzip using system unzip command
  if (fs.existsSync(ICOMOON_DIR)) {
    fs.rmSync(ICOMOON_DIR, { recursive: true, force: true })
  }
  execSync(`unzip -o ${ICOMOON_ZIP} -d ${ICOMOON_DIR}`)

  // 2. Move selection.json
  fs.copyFileSync(
    path.join(ICOMOON_DIR, 'selection.json'),
    path.join(ASSETS_DIR, 'icomoon-selection.json')
  )

  // 3. Copy fonts
  fs.readdirSync(path.join(ICOMOON_DIR, 'fonts')).forEach(file => {
    fs.copyFileSync(
      path.join(ICOMOON_DIR, 'fonts', file),
      path.join(PUBLIC_FONTS_DIR, file)
    )
  })

  // 4. Update SCSS
  let styleCss = fs
    .readFileSync(path.join(ICOMOON_DIR, 'style.css'), 'utf8')
    .replace(/(font-family:[^;]+;)/, '$1\n  font-display: swap;')

  fs.writeFileSync(
    path.join(SASS_DIR, '_icomoon.scss'),
    styleCss
  )

  // 5. Delete icomoon directory and zip file
  console.log(`${colors.cyan}Cleaning up...${colors.reset}`)
  if (fs.existsSync(ICOMOON_DIR)) {
    fs.rmSync(ICOMOON_DIR, { recursive: true, force: true })
  }
  fs.unlinkSync(ICOMOON_ZIP)

  console.log(
    `${colors.bold}${colors.green}IcoMoon update complete!${colors.reset}`
  )
}

main()
