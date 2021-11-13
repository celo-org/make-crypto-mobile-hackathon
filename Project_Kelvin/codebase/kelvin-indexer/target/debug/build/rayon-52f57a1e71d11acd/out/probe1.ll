; ModuleID = 'probe1.3a1fbbbh-cgu.0'
source_filename = "probe1.3a1fbbbh-cgu.0"
target datalayout = "e-m:w-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-windows-gnu"

%"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>" = type { [0 x i64], %"std::iter::StepBy<std::ops::Range<i32>>", [0 x i64] }
%"std::iter::StepBy<std::ops::Range<i32>>" = type { [0 x i64], i64, [0 x i32], { i32, i32 }, [0 x i8], i8, [7 x i8] }
%"std::panic::Location" = type { [0 x i64], { [0 x i8]*, i64 }, [0 x i32], i32, [0 x i32], i32, [0 x i32] }
%"unwind::libunwind::EXCEPTION_RECORD" = type { [0 x i8] }
%"unwind::libunwind::CONTEXT" = type { [0 x i8] }
%"unwind::libunwind::DISPATCHER_CONTEXT" = type { [0 x i8] }

@alloc1 = private unnamed_addr constant <{ [27 x i8] }> <{ [27 x i8] c"assertion failed: step != 0" }>, align 1
@alloc2 = private unnamed_addr constant <{ [89 x i8] }> <{ [89 x i8] c"/rustc/2fd73fabe469357a12c2c974c140f67e7cdd76d0\\library\\core\\src\\iter\\adapters\\step_by.rs" }>, align 1
@alloc3 = private unnamed_addr constant <{ i8*, [16 x i8] }> <{ i8* getelementptr inbounds (<{ [89 x i8] }>, <{ [89 x i8] }>* @alloc2, i32 0, i32 0, i32 0), [16 x i8] c"Y\00\00\00\00\00\00\00\15\00\00\00\09\00\00\00" }>, align 8

; core::iter::traits::iterator::Iterator::rev
; Function Attrs: inlinehint uwtable
define void @_ZN4core4iter6traits8iterator8Iterator3rev17hc2495f822647b078E(%"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>"* noalias nocapture sret dereferenceable(24) %0, %"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture dereferenceable(24) %self) unnamed_addr #0 {
start:
  %_2 = alloca %"std::iter::StepBy<std::ops::Range<i32>>", align 8
  %1 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %_2 to i8*
  %2 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %self to i8*
  call void @llvm.memcpy.p0i8.p0i8.i64(i8* align 8 %1, i8* align 8 %2, i64 24, i1 false)
; call core::iter::adapters::rev::Rev<T>::new
  call void @"_ZN4core4iter8adapters3rev12Rev$LT$T$GT$3new17h1513e195c20658d1E"(%"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>"* noalias nocapture sret dereferenceable(24) %0, %"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture dereferenceable(24) %_2)
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; core::iter::traits::iterator::Iterator::step_by
; Function Attrs: inlinehint uwtable
define void @_ZN4core4iter6traits8iterator8Iterator7step_by17h60e7ad6af7ef9bfbE(%"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture sret dereferenceable(24) %0, i32 %self.0, i32 %self.1, i64 %step) unnamed_addr #0 {
start:
; call core::iter::adapters::step_by::StepBy<I>::new
  call void @"_ZN4core4iter8adapters7step_by15StepBy$LT$I$GT$3new17h075bfa296cc3ceb0E"(%"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture sret dereferenceable(24) %0, i32 %self.0, i32 %self.1, i64 %step)
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; core::iter::adapters::rev::Rev<T>::new
; Function Attrs: uwtable
define void @"_ZN4core4iter8adapters3rev12Rev$LT$T$GT$3new17h1513e195c20658d1E"(%"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>"* noalias nocapture sret dereferenceable(24) %0, %"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture dereferenceable(24) %iter) unnamed_addr #1 {
start:
  %_2 = alloca %"std::iter::StepBy<std::ops::Range<i32>>", align 8
  %1 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %_2 to i8*
  %2 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %iter to i8*
  call void @llvm.memcpy.p0i8.p0i8.i64(i8* align 8 %1, i8* align 8 %2, i64 24, i1 false)
  %3 = bitcast %"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>"* %0 to %"std::iter::StepBy<std::ops::Range<i32>>"*
  %4 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %3 to i8*
  %5 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %_2 to i8*
  call void @llvm.memcpy.p0i8.p0i8.i64(i8* align 8 %4, i8* align 8 %5, i64 24, i1 false)
  ret void
}

; core::iter::adapters::step_by::StepBy<I>::new
; Function Attrs: uwtable
define void @"_ZN4core4iter8adapters7step_by15StepBy$LT$I$GT$3new17h075bfa296cc3ceb0E"(%"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture sret dereferenceable(24) %0, i32 %iter.0, i32 %iter.1, i64 %step) unnamed_addr #1 personality i32 (%"unwind::libunwind::EXCEPTION_RECORD"*, i8*, %"unwind::libunwind::CONTEXT"*, %"unwind::libunwind::DISPATCHER_CONTEXT"*)* @rust_eh_personality {
start:
  %1 = alloca { i8*, i32 }, align 8
  %_4 = icmp ne i64 %step, 0
  %_3 = xor i1 %_4, true
  br i1 %_3, label %bb1, label %bb2

bb1:                                              ; preds = %start
; invoke core::panicking::panic
  invoke void @_ZN4core9panicking5panic17hcfffd947284b8456E([0 x i8]* noalias nonnull readonly align 1 bitcast (<{ [27 x i8] }>* @alloc1 to [0 x i8]*), i64 27, %"std::panic::Location"* noalias readonly align 8 dereferenceable(24) bitcast (<{ i8*, [16 x i8] }>* @alloc3 to %"std::panic::Location"*))
          to label %unreachable unwind label %cleanup

bb2:                                              ; preds = %start
  %_7 = sub i64 %step, 1
  %2 = getelementptr inbounds %"std::iter::StepBy<std::ops::Range<i32>>", %"std::iter::StepBy<std::ops::Range<i32>>"* %0, i32 0, i32 3
  %3 = getelementptr inbounds { i32, i32 }, { i32, i32 }* %2, i32 0, i32 0
  store i32 %iter.0, i32* %3, align 8
  %4 = getelementptr inbounds { i32, i32 }, { i32, i32 }* %2, i32 0, i32 1
  store i32 %iter.1, i32* %4, align 4
  %5 = bitcast %"std::iter::StepBy<std::ops::Range<i32>>"* %0 to i64*
  store i64 %_7, i64* %5, align 8
  %6 = getelementptr inbounds %"std::iter::StepBy<std::ops::Range<i32>>", %"std::iter::StepBy<std::ops::Range<i32>>"* %0, i32 0, i32 5
  store i8 1, i8* %6, align 8
  ret void

bb3:                                              ; preds = %cleanup
  br label %bb4

bb4:                                              ; preds = %bb3
  %7 = bitcast { i8*, i32 }* %1 to i8**
  %8 = load i8*, i8** %7, align 8
  %9 = getelementptr inbounds { i8*, i32 }, { i8*, i32 }* %1, i32 0, i32 1
  %10 = load i32, i32* %9, align 8
  %11 = insertvalue { i8*, i32 } undef, i8* %8, 0
  %12 = insertvalue { i8*, i32 } %11, i32 %10, 1
  resume { i8*, i32 } %12

unreachable:                                      ; preds = %bb1
  unreachable

cleanup:                                          ; preds = %bb1
  %13 = landingpad { i8*, i32 }
          cleanup
  %14 = extractvalue { i8*, i32 } %13, 0
  %15 = extractvalue { i8*, i32 } %13, 1
  %16 = getelementptr inbounds { i8*, i32 }, { i8*, i32 }* %1, i32 0, i32 0
  store i8* %14, i8** %16, align 8
  %17 = getelementptr inbounds { i8*, i32 }, { i8*, i32 }* %1, i32 0, i32 1
  store i32 %15, i32* %17, align 8
  br label %bb3
}

; probe1::probe
; Function Attrs: uwtable
define void @_ZN6probe15probe17hcc631d850158b26eE() unnamed_addr #1 {
start:
  %_3 = alloca { i32, i32 }, align 4
  %_2 = alloca %"std::iter::StepBy<std::ops::Range<i32>>", align 8
  %_1 = alloca %"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>", align 8
  %0 = bitcast { i32, i32 }* %_3 to i32*
  store i32 0, i32* %0, align 4
  %1 = getelementptr inbounds { i32, i32 }, { i32, i32 }* %_3, i32 0, i32 1
  store i32 10, i32* %1, align 4
  %2 = getelementptr inbounds { i32, i32 }, { i32, i32 }* %_3, i32 0, i32 0
  %3 = load i32, i32* %2, align 4
  %4 = getelementptr inbounds { i32, i32 }, { i32, i32 }* %_3, i32 0, i32 1
  %5 = load i32, i32* %4, align 4
; call core::iter::traits::iterator::Iterator::step_by
  call void @_ZN4core4iter6traits8iterator8Iterator7step_by17h60e7ad6af7ef9bfbE(%"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture sret dereferenceable(24) %_2, i32 %3, i32 %5, i64 2)
  br label %bb1

bb1:                                              ; preds = %start
; call core::iter::traits::iterator::Iterator::rev
  call void @_ZN4core4iter6traits8iterator8Iterator3rev17hc2495f822647b078E(%"std::iter::Rev<std::iter::StepBy<std::ops::Range<i32>>>"* noalias nocapture sret dereferenceable(24) %_1, %"std::iter::StepBy<std::ops::Range<i32>>"* noalias nocapture dereferenceable(24) %_2)
  br label %bb2

bb2:                                              ; preds = %bb1
  ret void
}

; Function Attrs: argmemonly nounwind willreturn
declare void @llvm.memcpy.p0i8.p0i8.i64(i8* noalias nocapture writeonly, i8* noalias nocapture readonly, i64, i1 immarg) #2

; Function Attrs: nounwind uwtable
declare i32 @rust_eh_personality(%"unwind::libunwind::EXCEPTION_RECORD"*, i8*, %"unwind::libunwind::CONTEXT"*, %"unwind::libunwind::DISPATCHER_CONTEXT"*) unnamed_addr #3

; core::panicking::panic
; Function Attrs: cold noinline noreturn uwtable
declare void @_ZN4core9panicking5panic17hcfffd947284b8456E([0 x i8]* noalias nonnull readonly align 1, i64, %"std::panic::Location"* noalias readonly align 8 dereferenceable(24)) unnamed_addr #4

attributes #0 = { inlinehint uwtable "target-cpu"="x86-64" }
attributes #1 = { uwtable "target-cpu"="x86-64" }
attributes #2 = { argmemonly nounwind willreturn }
attributes #3 = { nounwind uwtable "target-cpu"="x86-64" }
attributes #4 = { cold noinline noreturn uwtable "target-cpu"="x86-64" }

!llvm.module.flags = !{!0}

!0 = !{i32 7, !"PIC Level", i32 2}
