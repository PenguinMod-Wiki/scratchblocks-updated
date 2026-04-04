import { addBlockDetection, parse } from '../index.js'

addBlockDetection('array builder', 'array builder (current::square arrays) {}::arrays square')
addBlockDetection('delete flags [gi] of regex', '@regex delete flags [gi] of @regex []::regex boolean')

const code = `
array builder (current) {}
delete flags [gi] of regex []
`

test('block detection functionality', () => {
  console.log('=== example for the block detection thingy ===\n')
  
  console.log('OG code:')
  console.log(code)

  const docWithoutDetection = parse(code)
  console.log('\nwithout block detection:')
  console.log(docWithoutDetection.stringify())

  const docWithDetection = parse(code, {
    detect_blocks: true
  })

  console.log('\nwith block detection:')
  console.log(docWithDetection.stringify())

  console.log('\n=== summary ===')
  console.log('✓ "array builder (current) {}" → "array builder (current::square arrays) {}::arrays square"')
  console.log('✓ "delete flags [gi] of regex []" → "@regex delete flags [gi] of @regex []::regex boolean"')
  
  const withoutStr = docWithoutDetection.stringify()
  const withStr = docWithDetection.stringify()
  
  expect(withoutStr).toContain('array builder (current)')
  expect(withStr).not.toBe(withoutStr)
  expect(withStr).toContain('square arrays')
  expect(withStr).toContain('regex boolean')
})
