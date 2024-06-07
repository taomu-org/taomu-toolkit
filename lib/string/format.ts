/**
 * 格式化身份证号
 *
 * - reg: /(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)/
 *
 * @param idCardNo
 * @param formatTemplate 自定义格式化模板，默认 '$1 $2$3$4 $5$6'
 * @returns
 */
export function formatIdCardNo(idCardNo?: string, formatTemplate = '$1 $2$3$4 $5$6') {
  if (!idCardNo) return ''
  return idCardNo.replace(/(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})(\d|x|X)/, formatTemplate)
}

/**
 * 格式化手机号 (3,4,4)
 *
 * - reg: /(\d{3})(\d{4})(\d{4})/
 *
 * @param phoneNo
 * @param formatTemplate 自定义格式化模板，默认 '$1 $2 $3'
 * @returns
 */
export function formatPhoneNo344(phoneNo?: string, formatTemplate = '$1 $2 $3') {
  if (!phoneNo) return ''
  return phoneNo.replace(/(\d{3})(\d{4})(\d{4})/, formatTemplate)
}
