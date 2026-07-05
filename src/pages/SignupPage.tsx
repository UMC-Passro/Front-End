/**
 * TODO: 회원가입 페이지를 구현하는 파일입니다.
 *
 * 구현 가이드:
 * - 기본 사용자 정보와 학교 인증 정보를 입력받습니다.
 * - 발송자/배송자 공통 가입 흐름을 먼저 만들고, 필요하면 역할 선택을 추가합니다.
 * - 가입 이후 통학 경로 등록 화면으로 이어지는 흐름을 고려합니다.
 */
import { Link } from "react-router-dom";

export default function SignupPage(){
    return(
        <>
            <h1>회원가입 페이지</h1>
            <Link to="/login">로그인 페이지로 이동</Link>
        </>
    );
}